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
    // const { password, ...userWithoutPassword } = user;
    // return userWithoutPassword;
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

const userDelete = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
    });
    if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    await prisma.user.delete({
        where: {
            id
        }
    })
    return user;
}

const userUpdate = async (id: string, payload: Partial<UserRegisterInput>) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    const updatedUser = await prisma.user.update({
        where: {
            id
        },
        data: payload
    })
    return updatedUser;
}

const getUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

export const authService = {
    userRegister,
    userLogin,
    userDelete,
    userUpdate,
    getUsers,
};
