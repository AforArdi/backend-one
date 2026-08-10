import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import type { UserRegisterInput } from "./auth.validation.js";

const userLogin = async (payload: any) => {
    const user = await prisma.user.findFirst({
        where: {
            email: payload.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            bio: true,
            password: true,
        }
    });

    if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    if (!user.password || !await bcrypt.compare(payload.password, user.password)) {
        throw new AppError("Invalid password", StatusCodes.UNAUTHORIZED);
    }

    return user;
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

    const user = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            bio: true,
        }
    })

    return user;

};

export const authService = {
    userRegister,
    userLogin
};
