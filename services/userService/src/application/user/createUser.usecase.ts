import type { User } from "../../domain/user.entity.js";
import type { CreateUserInput } from "../../domain/user.types.js";
import { PasswordService } from "../../infrastructure/auth/password.service.js";
import { publish } from "../../infrastructure/events/kafka.producer.js";
import { Topics } from "../../infrastructure/events/kafka.topics.js";

const passwordService = new PasswordService();

export class CreateUserUseCase{
    constructor(private repo:any){}

    async execute(input:CreateUserInput):Promise<User>{
        input.password = await passwordService.hash(input.password);

        const user:User = await this.repo.create(input);

        await publish(Topics.USER_CREATED,user);

        return user;
    }
}