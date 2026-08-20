import { getRedisClient } from "../../config/redis.js";
import { AppError } from "../../utils/AppError.js";
import { StatusCodes } from "http-status-codes";

const OTP_EXPIRY_SECONDS = 60 * 5; // 5 minutes

export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtpAndPayload = async (email: string, otp: string, payload?: any): Promise<void> => {
    const redis = await getRedisClient();

    // Store OTP and user payload as a JSON string
    const dataToStore = {
        otp,
        payload
    };

    const key = `register:${email}`;
    await redis.setEx(key, OTP_EXPIRY_SECONDS, JSON.stringify(dataToStore));

    console.log(`OTP stored for ${email}: ${otp} (expires in ${OTP_EXPIRY_SECONDS} seconds)`);
};

export const verifyOtpAndGetPayload = async (email: string, otp: string): Promise<any> => {
    const redis = await getRedisClient();
    const key = `register:${email}`;

    const storedDataStr = await redis.get(key);

    if (!storedDataStr) {
        throw new AppError("OTP expired or not found", StatusCodes.NOT_FOUND);
    }

    const storedData = JSON.parse(storedDataStr);

    if (storedData.otp !== otp) {
        throw new AppError("Invalid OTP", StatusCodes.UNAUTHORIZED);
    }

    // Valid OTP, remove it from Redis so it cannot be reused
    await redis.del(key);
    console.log(`OTP verified for ${email}`);

    return storedData.payload;
};
