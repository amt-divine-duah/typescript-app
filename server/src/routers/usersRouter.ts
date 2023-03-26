import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const usersController = new UsersController()

const usersRouter = Router();

// define routers

// Get all users
usersRouter.get("/", usersController.getUsers)

// Get a user
usersRouter.get("/:id", usersController.getUser)

export default usersRouter