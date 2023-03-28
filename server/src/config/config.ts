import * as dotenv from "dotenv"

dotenv.config()

const configValues = Object.freeze({
    // Port Number
    APP_PORT: Number(process.env.APP_PORT) || 3001,

    // Database Configurations
    DB_HOST: process.env.DB_HOST || "127.0.0.1",
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_USERNAME: process.env.DB_USERNAME || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "pg1234",
    DB_DATABASE: process.env.DB_DATABASE || "myappdb",

    // Security
    SECRET_KEY: process.env.SECRET_KEY || "hello",
    JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || '1h'

})

export default configValues