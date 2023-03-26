import { Response, Request } from "express";

export class ResponseUtil {
  // General Response
  static sendResponse<T>(
    res: Response,
    message: string,
    data: T,
    statusCode: number = 200,
    paginationInfo: any = null
  ): Response<T> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      paginationInfo,
    });
  }

  // Error Response
  static sendError<T>(res: Response, message: string, statusCode: number = 500, error: T): Response<T> {
    return res.status(statusCode).json({
      success: false,
      message: message,
      error,
    });
  }
}
