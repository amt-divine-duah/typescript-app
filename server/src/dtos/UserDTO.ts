import Joi from "joi";
import { isUnique } from "../validators/isUniqueValidator";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";

const userRepo = AppDataSource.getRepository(UserEntity);

// Update User schema
export const updateUserSchema = Joi.object({

  id: Joi.string().required(),
  username: Joi.string().external(isUnique(userRepo, "username")),
  email: Joi.string().email().external(isUnique(userRepo, "email")),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({ "string.pattern.base": "Password must be alphanumeric and between 3 - 30 characters long" }),
  repeat_password: Joi.string()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Passwords do not match", "any.required": "Passwords do not match" }),
});
