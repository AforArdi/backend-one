import { getRedisClient } from "../config/redis.js";

// cache set
const setCache = async (key: string, value: string, ttl: number = 60) => {
    const redis = await getRedisClient();
    await redis.setEx(key, ttl, value);
};

// cache get
const getCache = async (key: string) => {
    const redis = await getRedisClient();
    const cachedData = await redis.get(key);
    if (!cachedData) {
        return null;
    }
    return JSON.parse(cachedData);
};

// cache del
const delCache = async (key: string) => {
    const redis = await getRedisClient();
    await redis.del(key);
};

export const cacheService = {
    setCache,
    getCache,
    delCache
}
