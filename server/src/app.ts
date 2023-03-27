import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routers/usersRouter";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResponseUtil } from "./utils/Response";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import authRouter from "./routers/authRouter";


export default function configureApp() {
  const app: Application = express();

  // region middlewares
  app.use(cors()); // Enable cors (Cross-Origin Resource Sharing (CORS))
  app.use(morgan("dev")); // print in the dev console, all requests coming intoo the app
  app.use(bodyParser.json()); //  parses incoming requests with JSON payloads

  // end middlewares

  // Region Routes
  app.use("/users", usersRouter);
  app.use("/auth", authRouter)

  app.use("*", (req: Request, res: Response) => {
    return ResponseUtil.sendError(
      res,
      "Item/page you are looking for does not exist",
      StatusCodes.NOT_FOUND,
      ReasonPhrases.NOT_FOUND
    );
  });

  // Define a middleware function to handle errors
  app.use(ErrorHandler.handleErrors);

  return app;
}
