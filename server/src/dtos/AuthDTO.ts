import Joi from "joi"
import { isUnique } from "../validators/isUniqueValidator"
import { AppDataSource } from "../database/data-source"
import { UserEntity } from "../database/entities/UserEntity"

const userRepo = AppDataSource.getRepository(UserEntity)


// Registration schema
export const registerSchema = Joi.object({
    username: Joi.string().required().external(isUnique(userRepo, "username")),
    email: Joi.string().email().required().external(isUnique(userRepo, "email"))
})

// Login Schema
export const loginSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required()
})