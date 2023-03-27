import { Request, Response, NextFunction } from "express";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtil } from "../utils/Response";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import Joi from "joi";

export class ErrorHandler {
  // Create a wrapper to handle errors
  static catchErrors(fn) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  static handleErrors(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    if (err instanceof EntityNotFoundError) {
      return ResponseUtil.sendError(
        res,
        "Item/Page you are looking for does not exist",
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND
      );
    }

    // Validation Errors
    if (err.details && Array.isArray(err.details)) {
      const errors = ErrorHandler.formatErrors(err.details);
      return ResponseUtil.sendError(res, ReasonPhrases.UNPROCESSABLE_ENTITY, StatusCodes.UNPROCESSABLE_ENTITY, errors);
    }

    // any other error
    return ResponseUtil.sendError(
      res,
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR
    );
  }

  // format errors
  static formatErrors(details: Joi.ValidationErrorItem[]) {
    const errors = {};
    details.forEach((d) => {
      const key = d.path.join(".");
      if (!errors[key]) {
        errors[key] = [];
      }
      errors[key].push(d.message);
    });
    return errors;
  }
}
