import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";
import { ResponseUtil } from "../utils/Response";

export class UsersController {
  // Get users
  async getUsers(req: Request, res: Response, next: NextFunction) {
    // User Repo
    const userRepo = AppDataSource.getRepository(UserEntity);

    const users = await userRepo.find();

    return ResponseUtil.sendResponse(res, "Users fetched successfully", users);
  }

  // Get a user
  async getUser(req: Request, res: Response, next: NextFunction) {
    // Get id from request
    const { id } = req.params;
    // User Repo
    const userRepo = AppDataSource.getRepository(UserEntity);

    const user = await userRepo.findOneByOrFail({
      id: id,
    });

    return ResponseUtil.sendResponse(res, "User fetched successfully", user);
  }
}
