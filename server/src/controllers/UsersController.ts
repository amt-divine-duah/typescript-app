import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";
import { ResponseUtil } from "../utils/Response";
import { Paginator } from "../utils/Paginator";
import { StatusCodes } from "http-status-codes";
import { updateUserSchema } from "../dtos/UserDTO";
import { hash } from "bcryptjs";

export class UsersController {
  // Get users
  async getUsers(req: Request, res: Response, next: NextFunction) {
    // create query builder
    const queryBuilder = AppDataSource.getRepository(UserEntity).createQueryBuilder();

    const { records: users, paginationInfo } = await Paginator.paginate(queryBuilder, req);

    const usersData = users.map((user) => {
      return user.toResponse();
    });
    
    return ResponseUtil.sendResponse(res, "Users fetched successfully", usersData, StatusCodes.OK, paginationInfo);
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

    return ResponseUtil.sendResponse(res, "User fetched successfully", { ...user.toResponse() });
  }

  // Update user details
  async updateUser(req: Request, res: Response, next: NextFunction) {
    // Get the user id from the request
    const id = req.params.id;
    const userData = req.body;

    // Check if user exists
    const userRepo = AppDataSource.getRepository(UserEntity);
    const user = await userRepo.findOneByOrFail({
      id: id,
    });

    // Add the id to userData
    userData.id = id;

    // Perform validations on userData
    await updateUserSchema.validateAsync(userData, {
      abortEarly: false,
      errors: { label: "key", wrap: { label: false } },
    });

    // If password is provided, hash the password
    if (userData.password) {
      userData.password = await hash(userData.password, 12)
    }

    userRepo.merge(user, userData);
    await userRepo.save(user);

    return ResponseUtil.sendResponse(res, "User Updated successfully", { ...user.toResponse() }, StatusCodes.OK);
  }
}
