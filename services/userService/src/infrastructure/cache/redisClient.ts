import { createClient } from "redis";
import { env } from "../../config/env.js";

export const redis = createClient({
    url: env.REDIS_URL
});

export const connectRedis = async () => {
    await redis.connect();
    console.log("Redis connected");
}