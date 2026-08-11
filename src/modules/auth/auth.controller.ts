import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { sendEmail } from "../../services/mail.service.js";
import testTemp from "../../utils/mail.template.js";

const register = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await authService.userRegister(payload);

    // Send welcome email asynchronously without blocking the response
    sendEmail({
        to: result.email,
        subject: "Welcome to Rise Together!",
        html: testTemp(result.name, result.email)
    }).catch(err => console.error("Failed to send welcome email:", err));

    ApiResponse.success(res, 'registration success', 200, result);
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

export const authController = {
    login,
    register,
    deleteUser,
    updateUser
};
