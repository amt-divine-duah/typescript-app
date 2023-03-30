import { Router } from "express";
import { AuthContoller } from "../controllers/AuthController";
import { ErrorHandler } from "../middlewares/ErrorHandler";

// Create instance of auth controller
const authController = new AuthContoller();

const authRouter = Router();

// Define auth routers

// register route
authRouter.post("/register", ErrorHandler.catchErrors(authController.register));

// login route
authRouter.post("/login", ErrorHandler.catchErrors(authController.login));

// confirm Account
authRouter.get("/confirmAccount/:token", ErrorHandler.catchErrors(authController.confirm));

// Forgot Password
authRouter.post("/forgotPassword", ErrorHandler.catchErrors(authController.forgotPassword));

// verify password reset request
authRouter.get(
  "/verifyPasswordResetRequest/:token",
  ErrorHandler.catchErrors(authController.verifyPasswordResetRequest)
);

// reset password
authRouter.post("/resetPassword/:token", ErrorHandler.catchErrors(authController.resetPassword))

export default authRouter;
