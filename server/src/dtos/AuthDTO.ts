import Joi from "joi";
import { isUnique } from "../validators/isUniqueValidator";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";

const userRepo = AppDataSource.getRepository(UserEntity);

// Registration schema
export const registerSchema = Joi.object({
  username: Joi.string().required().external(isUnique(userRepo, "username")),
  email: Joi.string().email().required().external(isUnique(userRepo, "email")),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({ "string.pattern.base": "Password must be alphanumeric and between 3 - 30 characters long" }),
    repeat_password: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Passwords do not match", "any.required": "Passwords do not match" }),
});

// Login Schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required()
  .messages({ "string.pattern.base": "Password must be alphanumeric and between 3 - 30 characters long" }),
});

// Forgot Password
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Reset password
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required()
  .messages({ "string.pattern.base": "Password must be alphanumeric and between 3 - 30 characters long" }),
});
