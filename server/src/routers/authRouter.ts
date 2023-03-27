import {Router} from "express"
import { AuthContoller } from "../controllers/AuthController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

// Create instance of auth controller
const authController = new AuthContoller()


const authRouter = Router();

// Define auth routers

// register route
authRouter.post("/register", ErrorHandler.catchErrors(authController.register));


export default authRouter