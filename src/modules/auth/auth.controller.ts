import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

const register = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return ApiResponse.error(res, 400, 'All fields are required');
    }

    const result = await authService.userRegister({ name, email, password });

    ApiResponse.success(res, 'registration success', 200, result);
});
const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.userLogin({ email, password });

    ApiResponse.success(res, 'login success', 200, result);
});

export const authController = {
    login,
    register
};
