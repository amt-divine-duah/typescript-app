import { Request, Response, NextFunction } from "express";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtil } from "../utils/Response";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

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

    // any other error
    return ResponseUtil.sendError(
      res,
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR
    );
  }
}
