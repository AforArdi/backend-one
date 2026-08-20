import dotenv from "dotenv";
import { validateEnv } from "./env.validation.js";

dotenv.config();

const validatedEnv = validateEnv(process.env);

export const env = {
    port: validatedEnv.PORT,
    nodeEnv: validatedEnv.NODE_ENV,
    databaseUrl: validatedEnv.DATABASE_URL,
    smtpHost: validatedEnv.SMTP_HOST,
    smtpPort: validatedEnv.SMTP_PORT,
    smtpSecure: validatedEnv.SMTP_SECURE,
    smtpUser: validatedEnv.SMTP_USER,
    smtpPass: validatedEnv.SMTP_PASS,
    smtpFrom: validatedEnv.SMTP_FROM,
    r2Endpoint: validatedEnv.R2_ENDPOINT,
    r2AccessKeyId: validatedEnv.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: validatedEnv.R2_SECRET_ACCESS_KEY,
    r2BucketName: validatedEnv.R2_BUCKET_NAME,
    r2PublicUrl: validatedEnv.R2_PUBLIC_URL,
    r2AccountId: validatedEnv.R2_ACCOUNT_ID,
    redisUrl: validatedEnv.REDIS_URL,
};