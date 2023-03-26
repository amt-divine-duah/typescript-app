import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

const usersController = new UsersController();

const usersRouter = Router();

// define routers

// Get all users
usersRouter.get("/", ErrorHandler.catchErrors(usersController.getUsers));

// Get a user
usersRouter.get("/:id", ErrorHandler.catchErrors(usersController.getUser));

export default usersRouter;
