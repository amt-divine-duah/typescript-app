import {DataSource} from "typeorm"
import * as dotenv from "dotenv"
import { CreateUsersTable1679828897580 } from "./migrations/1679828897580-CreateUsersTable"
import { UserEntity } from "./entities/UserEntity"

dotenv.config()


// Set up database
export const AppDataSource = new DataSource({

    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "myname",
    password: process.env.DB_PASSWORD || "mypassword",
    database: process.env.DB_DATABASE || "thisdb",
    logging: true,
    subscribers: [],
    entities: [
        UserEntity
    ],
    migrations: [
        CreateUsersTable1679828897580,
    ]
})