import Joi from "joi"

// Registration schema
export const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required()
})

// Login Schema
export const loginSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required()
})