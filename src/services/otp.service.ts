import { getRedisClient } from "../config/redis.js";

const OTP_EXPIRY_SECONDS = 60 * 5;

export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtp = async (email: string, otp: string): Promise<void> => {
    const redis = await getRedisClient();
    const key = `otp:${email}`;

    await redis.setEx(key, OTP_EXPIRY_SECONDS, otp);

    console.log(`OTP stored for ${email}: ${otp} (expires in ${OTP_EXPIRY_SECONDS} seconds)`);

};

export const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    const redis = await getRedisClient();
    const key = `otp:${email}`;

    const storedOtp = await redis.get(key);

    if (!storedOtp) {
        console.log(`OTP not found for ${email}`);
        return false;
    }

    const isValidOtp = storedOtp === otp;

    if (isValidOtp) {
        await redis.del(key);
        console.log(`OTP verified for ${email}`);
    }

    return isValidOtp;
};

export const getOtpTTL = async (email: string): Promise<number> => {
    const redis = await getRedisClient();
    const key = `otp:${email}`;
    return await redis.ttl(key);
};


