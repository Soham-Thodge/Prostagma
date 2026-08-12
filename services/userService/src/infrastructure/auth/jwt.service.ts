import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { redis } from "../cache/redisClient.js";

export class JwtService {
    generateAccessToken(userId: string): string {
        return jwt.sign({ userId }, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
    }

    async generateRefreshToken(userId: string): Promise<string> {
        const token: string = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: "15m" });

        await redis.set(`refreshToken:${userId}`, token, {
            EX: 7 * 24 * 60 * 60
        })

        return token;
    }

    verifyAccessToken(token: string) {
        return jwt.verify(token, env.JWT_ACCESS_SECRET);
    }

    verifyRefreshToken(token: string) {
        return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }

    async revokeRefreshToken(userId: string) {
        await redis.del(`refreshToken:${userId}`);
    }
}