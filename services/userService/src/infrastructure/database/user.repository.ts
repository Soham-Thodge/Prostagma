import { User } from "../../domain/user.entity.js";
import type { CreateUserInput } from "../../domain/user.types.js";
import { getString } from "../../shared/utils/typeGuard.js";
import { redis } from "../cache/redisClient.js";
import { UserModel } from "./user.model.js";

export class MongoUserRepository {
    async create(input: CreateUserInput) {
        const user = await UserModel.create(input);

        const result = new User(
            user._id.toString(),
            getString(user.email),
            getString(user.firstName),
            getString(user.lastName)
        )

        await redis.set(`user:${result.id}`, JSON.stringify(result), {
            EX: 60 * 60 * 12
        });

        return result;
    }

    async findById(id: string) {
        const cached = await redis.get(`user:${id}`);

        if (cached)
            return JSON.parse(cached);

        const user = await UserModel.findById(id);

        if (!user) return Error("User not found");

        const result = new User(
            user._id.toString(),
            getString(user.email),
            getString(user.firstName),
            getString(user.lastName)
        )

        await redis.set(`user:${result.id}`, JSON.stringify(result), {
            EX: 60 * 60 * 12
        });

        return result;
    }

    async findByEmail(email: string) {
        const user = await UserModel.findOne({ email });

        if (!user) return Error("User not found");

        const result = new User(
            user._id.toString(),
            getString(user.email),
            getString(user.firstName),
            getString(user.lastName)
        )

        await redis.set(`user:${result.id}`, JSON.stringify(result), {
            EX: 60 * 60 * 12
        });

        return result;
    }
}