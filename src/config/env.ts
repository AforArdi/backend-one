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
};