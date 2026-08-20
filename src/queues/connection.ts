import { env } from "../config/env.js";
import { Redis } from "ioredis";

export const redisConnection = new Redis(env.redisUrl, {
    maxRetriesPerRequest: null,
});