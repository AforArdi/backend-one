import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL: z.string(),
});

export const validateEnv = (env: NodeJS.ProcessEnv) => {
    const result = envSchema.safeParse(env);

    if (!result.success) {
        console.error("Invalid environment variables:", result.error.issues);

        process.exit(1);
    }

    return result.data;
};