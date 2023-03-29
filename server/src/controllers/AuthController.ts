import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "../utils/Response";
import { loginSchema, registerSchema } from "../dtos/AuthDTO";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { compare } from "bcryptjs";
import { TokenEntity } from "../database/entities/TokenEntity";
import { GeneralUtils } from "../utils/GeneralUtils";
import configValues from "../config/config";
import { confirmAccountTemplate } from "../templates/confirmAccount";
import { MailService } from "../services/mailService";
import { TokenType } from "../constants/TokenType";

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

    // Generate confirmationToken
    const token = GeneralUtils.generateConfirmationToken(user);

    // Create verificationUrl
    const verificationUrl = configValues.ACCOUNT_CONFIRMATION_URL + "/" + token.accessToken;

    // Create Email
    const htmlTemplate = confirmAccountTemplate(user.username, verificationUrl);
    // Send Email
    MailService.sendEmail({
      from: configValues.MAIL_DEFAULT_SENDER,
      to: user.email,
      html: htmlTemplate.html,
      subject: "Confirm Your account",
    });

    return ResponseUtil.sendResponse(res, "Registration was successful", { ...user.toResponse() }, StatusCodes.CREATED);
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
    // Generate token and Get the expiration Time
    const token = GeneralUtils.generateAuthToken(user);
    const decoded = GeneralUtils.getTokenExpiration(token.accessToken);

    if (typeof decoded === "undefined") {
      return ResponseUtil.sendError(
        res,
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR
      );
    }

    const tokenRepo = AppDataSource.getRepository(TokenEntity);
    // CReate a new Token instance
    const newToken = tokenRepo.create({
      user: user,
      tokenExpiration: new Date(decoded * 1000),
      token: token.accessToken,
    });
    await tokenRepo.save(newToken);

    const response = {
      ...user.toResponse(),
      ...token,
    };

    return ResponseUtil.sendResponse(res, "User logged in successfully", response);
  }

  // Confirm account
  async confirm(req: Request, res: Response, next: NextFunction) {
    // Get the token from the request
    const { token } = req.params;

    // Verify the token
    const payload = GeneralUtils.validateJWT(token);

    if (!payload) {
      return ResponseUtil.sendError(
        res,
        "Invalid or expired Token",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    // Check for the token type
    if (payload["tokenType"] !== TokenType.CONFIRM_ACCOUNT || !payload["id"]) {
      return ResponseUtil.sendError(res, "Invalid Request", StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
    }

    // Get the user and confirm their account
    const userRepo = AppDataSource.getRepository(UserEntity)
    const user = await userRepo.findOneByOrFail({
      id: payload["id"]
    })
    
    if (user.confirmed) {
      return ResponseUtil.sendResponse(res, "User is already verified", null)
    }

    // confirm the account
    user.confirmed = true
    await userRepo.save(user)

    return ResponseUtil.sendResponse(res, "Account confirmed successfully", null);
  }
}
