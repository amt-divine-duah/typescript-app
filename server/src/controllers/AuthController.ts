import {Request, Response, NextFunction} from "express";
import { ResponseUtil } from "../utils/Response";
import { registerSchema } from "../dtos/AuthDTO";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";
import { StatusCodes } from "http-status-codes";


export class AuthContoller {
    // Register users
    async register(req: Request, res: Response, next: NextFunction) {

        // Get registration data from request
        const registerData = req.body

        // Perform validations
        await registerSchema.validateAsync(registerData, {
            abortEarly: false,
            errors: {label: "key", wrap:{label: false}}
        })

        // Save user Data
        const {username, email, password} = registerData
        const userRepo = AppDataSource.getRepository(UserEntity)
        const user = userRepo.create({username, email, password})
        await userRepo.save(user)
        
        return ResponseUtil.sendResponse(res, "Registration was successful", user, StatusCodes.CREATED)
    }
}