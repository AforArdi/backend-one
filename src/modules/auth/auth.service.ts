import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import type { UserRegisterInput } from "./auth.validation.js";

const userLogin = async (payload: any) => {
    const { email, password } = payload;

    return { email, password };
};
const userRegister = async (payload: UserRegisterInput) => {
    const userExists = await prisma.user.findFirst({
        where: {
            email: payload.email,
        },
    });

    if (userExists) {
        throw new AppError("User already exists", StatusCodes.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        },
    })

};

export const authService = {
    userRegister,
    userLogin
};
