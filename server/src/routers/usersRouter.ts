import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ErrorHandler } from "../middlewares/ErrorHandler";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const usersController = new UsersController();

const usersRouter = Router();

// define routers

// Get all users
usersRouter.get(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(usersController.getUsers)
);

// Get a user
usersRouter.get(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(usersController.getUser)
);

// Update user details
usersRouter.put(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(usersController.updateUser)
);

export default usersRouter;
