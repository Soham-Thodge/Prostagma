import { redis } from "../cache/redisClient.js";

export const rateLimiter = async (key: string) => {
    const count = await redis.incr(key);

    if (count === 1) await redis.expire(key, 60);
    if (count > 100) throw new Error("Too many requests");

}