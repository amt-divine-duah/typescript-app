import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";

export class UsersController {
    
    // Get users
    async getUsers(req: Request, res: Response, next: NextFunction) {

        // User Repo
        const userRepo = AppDataSource.getRepository(UserEntity)

        const users = await userRepo.find()

        return res.status(200).json({
            success: true,
            message: "Fetched users successfully",
            data: users
        })
    }
}