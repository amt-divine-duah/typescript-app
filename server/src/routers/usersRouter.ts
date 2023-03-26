import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const usersController = new UsersController()

const usersRouter = Router();

// define routers
usersRouter.get("/", usersController.getUsers)


export default usersRouter