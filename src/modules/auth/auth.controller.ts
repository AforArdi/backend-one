import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.userLogin({ email, password });

    ApiResponse.success(res, 'login success', 200, result);
});

export const authController = {
    login
};
