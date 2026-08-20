import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL: z.string(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_SECURE: z.coerce.boolean(),
    SMTP_USER: z.email(),
    SMTP_PASS: z.string(),
    SMTP_FROM: z.email(),
    R2_ENDPOINT: z.url(),
    R2_ACCESS_KEY_ID: z.string(),
    R2_SECRET_ACCESS_KEY: z.string(),
    R2_BUCKET_NAME: z.string(),
    R2_PUBLIC_URL: z.url(),
    R2_ACCOUNT_ID: z.string(),
    REDIS_URL: z.string(),
});

export const validateEnv = (env: NodeJS.ProcessEnv) => {
    const result = envSchema.safeParse(env);

    if (!result.success) {
        console.error("Invalid environment variables:", result.error.issues);

        process.exit(1);
    }

    return result.data;
};