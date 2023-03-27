import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";
import { ResponseUtil } from "../utils/Response";
import { Paginator } from "../utils/Paginator";
import { StatusCodes } from "http-status-codes";

export class UsersController {
  // Get users
  async getUsers(req: Request, res: Response, next: NextFunction) {
    // create query builder
    const queryBuilder = AppDataSource.getRepository(UserEntity).createQueryBuilder();

    const { records: users, paginationInfo } = await Paginator.paginate(queryBuilder, req);

    return ResponseUtil.sendResponse(res, "Users fetched successfully", users, StatusCodes.OK, paginationInfo);
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
