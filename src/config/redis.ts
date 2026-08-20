import { createClient } from "redis";
import { env } from "./env.js";

let redisClient: ReturnType<typeof createClient> | null = null;

export const getRedisClient = async () => {
    if (redisClient) {
        return redisClient;
    }

    redisClient = createClient({
        url: env.redisUrl,
    })

    redisClient.on("error", (err) => console.error("Redis Client Error:", err));
    redisClient.on("connect", () => console.log("Redis Connected"));

    await redisClient.connect();

    return redisClient;
}

export const disconnectRedis = async () => {
    if (redisClient) {
        await redisClient.quit();
        redisClient = null;
    }
}