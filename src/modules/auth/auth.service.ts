import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import type { UserRegisterInput } from "./auth.validation.js";
import { deleteImage, uploadImage } from "../../utils/r2.js";
import { cacheService } from "../../services/cache.service.js";

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
const userRegister = async (payload: UserRegisterInput, avatarFile?: Buffer) => {
    const userExists = await prisma.user.findFirst({
        where: {
            email: payload.email,
        },
    });

    if (userExists) {
        throw new AppError("User already exists", StatusCodes.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    let avatarKey: string | null = null;
    let avatarUrl: string | null = null;

    if (avatarFile) {
        const result = await uploadImage(avatarFile, { folder: "rise-together-backend-class" });
        avatarKey = result.key;
        avatarUrl = result.url;
    }

    const user = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword,
            ...(avatarKey && { avatarKey }),
            ...(avatarUrl && { avatarUrl }),
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            bio: true,
            avatarUrl: true,
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
    const cacheKey = "all_users";
    const cachedUsers = await cacheService.getCache(cacheKey);

    if (cachedUsers) {
        console.log("Fetched users from Redis Cache");
        return cachedUsers;
    }

    console.log("Fetched users from Database");
    const users = await prisma.user.findMany();

    await cacheService.setCache(cacheKey, JSON.stringify(users), 60);

    return users;
}

const userDeleteAvatar = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    if (user.avatarKey) {
        await deleteImage(user.avatarKey)
    }
    await prisma.user.update({
        where: {
            id
        },
        data: {
            avatarUrl: null,
            avatarKey: null,
        }
    })
    return user;
}

export const authService = {
    userRegister,
    userLogin,
    userDelete,
    userUpdate,
    getUsers,
    userDeleteAvatar,
};
