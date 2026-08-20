import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { sendEmail } from "../../services/mail.service.js";
import { generateOtp, storeOtpAndPayload } from "../otp/otp.service.js";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { StatusCodes } from "http-status-codes";
import { otpTemplate } from "../../templates/otpTemplate.js";

const register = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    // 1. Quick check if user already exists before sending OTP
    const userExists = await prisma.user.findUnique({ where: { email: payload.email } });
    if (userExists) {
        throw new AppError("User already exists", StatusCodes.CONFLICT);
    }

    // 2. Generate and store OTP along with the user's registration payload in Redis
    const otp = generateOtp();
    await storeOtpAndPayload(payload.email, otp, payload);

    // 3. Send the OTP via email
    sendEmail({
        to: payload.email,
        subject: "Verify your email for Rise Together",
        html: otpTemplate(otp, 10)
    }).catch(err => console.error("Failed to send OTP email:", err));

    ApiResponse.success(res, 'OTP sent to email. Please verify to complete registration.', 200, null);
});

const login = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await authService.userLogin(payload);

    ApiResponse.success(res, 'login success', 200, result);
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.body;

    const result = await authService.userDelete(id);

    ApiResponse.success(res, 'user deleted successfully', 200, result);
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id, ...payload } = req.body;

    const result = await authService.userUpdate(id, payload);

    ApiResponse.success(res, 'user updated successfully', 200, result);
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.getUsers();

    ApiResponse.success(res, 'users fetched successfully', 200, result);
})

const deleteUserAvatar = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const result = await authService.userDeleteAvatar(id);

    ApiResponse.success(res, 'user avatar deleted successfully', 200, result);
})

export const authController = {
    login,
    register,
    deleteUser,
    updateUser,
    getAllUsers,
    deleteUserAvatar
};
