import type { Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/database/user.repository.js";
import { CreateUserUseCase } from "../../application/user/createUser.usecase.js";

const repo = new MongoUserRepository();

export const createUser = async(req:Request,res:Response)=>{
    const usecase = new CreateUserUseCase(repo);
    res.json(await usecase.execute(req.body));
}