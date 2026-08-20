import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { generateOtp, storeOtpAndPayload, verifyOtpAndGetPayload } from "./otp.service.js";
import { authService } from "../auth/auth.service.js";
import { sendEmail } from "../../services/mail.service.js";
import { otpTemplate } from "../../templates/otpTemplate.js";
import { AppError } from "../../utils/AppError.js";


export const sendOtp = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;

    // Usually used for resending OTP, we just generate and store without payload
    const otp = generateOtp();
    await storeOtpAndPayload(email, otp);

    await sendEmail({
        to: email,
        subject: "Your OTP Code",
        html: otpTemplate(otp),
    }).catch(err => {
        console.error("Failed to send OTP email:", err);
        throw new AppError("Failed to send email: " + err.message, 500);
    });

    ApiResponse.success(res, "OTP sent successfully to your email", 200, null);
});

export const verifyOtp = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    // Verify OTP and get the temporarily stored registration payload
    const payload = await verifyOtpAndGetPayload(email, otp);

    if (!payload) {
        // If there's no payload, it might have been a simple verification request
        return ApiResponse.success(res, "OTP verified successfully", 200, null);
    }

    const user = await authService.userRegister(payload);

    await sendEmail({
        to: user.email,
        subject: "Welcome to Rise Together!",
        html: otpTemplate(otp)
    }).catch(err => {
        console.error("Failed to send welcome email:", err);
        // We log but don't throw here, because the user is already registered!
    });

    ApiResponse.success(res, "OTP verified and user registered successfully", 200, user);
});
