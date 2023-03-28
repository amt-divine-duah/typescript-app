import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "../utils/Response";
import { loginSchema, registerSchema } from "../dtos/AuthDTO";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { compare } from "bcryptjs";

export class AuthContoller {
  // Register users
  async register(req: Request, res: Response, next: NextFunction) {
    // Get registration data from request
    const registerData = req.body;

    // Perform validations
    await registerSchema.validateAsync(registerData, {
      abortEarly: false,
      errors: { label: "key", wrap: { label: false } },
    });

    // Save user Data
    const { username, email, password } = registerData;
    const userRepo = AppDataSource.getRepository(UserEntity);
    const user = userRepo.create({ username, email, password });
    await userRepo.save(user);

    return ResponseUtil.sendResponse(res, "Registration was successful", user, StatusCodes.CREATED);
  }

  // Login User
  async login(req: Request, res: Response, next: NextFunction) {
    const loginData = req.body;

    // validate loginData
    await loginSchema.validateAsync(loginData, {
      abortEarly: false,
      errors: { label: "key", wrap: { label: false } },
    });

    const userRepo = AppDataSource.getRepository(UserEntity);
    // find the user
    const user = await userRepo.findOneByOrFail({
      email: loginData.email,
    });
    // Check for valid password
    const isValidPassword = await compare(loginData.password, user.password);

    // If credentials are incorrect
    if (!isValidPassword) {
      return ResponseUtil.sendError(
        res,
        "Invalid credentials. Try again",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    // If account is not confirmed
    if (!user.confirmed) {
        return ResponseUtil.sendError(
            res,
            "Please confirm your account and try again",
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST
          );
    }
    // TODO: Generate auth token for user
    return ResponseUtil.sendResponse(res, "User logged in successfully", user);
  }
}
