import dotenv from "dotenv";
import { validateEnv } from "./env.validation.js";

dotenv.config();

const validatedEnv = validateEnv(process.env);

export const env = {
    port: validatedEnv.PORT,
    nodeEnv: validatedEnv.NODE_ENV,
};