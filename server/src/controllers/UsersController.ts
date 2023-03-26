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

    // Get a user
    async getUser(req: Request, res: Response, next: NextFunction) {

        // Get id from request
        const {id} = req.params
        // User Repo
        const userRepo = AppDataSource.getRepository(UserEntity)

        const user = await userRepo.findOneBy({
            id: id,
        });

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    }
}