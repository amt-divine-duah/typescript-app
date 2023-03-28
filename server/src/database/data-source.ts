import {DataSource} from "typeorm"
import * as dotenv from "dotenv"
import { CreateUsersTable1679828897580 } from "./migrations/1679828897580-CreateUsersTable"
import { UserEntity } from "./entities/UserEntity"
import { CreateRolesTable1679946949469 } from "./migrations/1679946949469-CreateRolesTable"
import { RoleEntity } from "./entities/RoleEntity"
import { CreateTokensTable1679977778839 } from "./migrations/1679977778839-CreateTokensTable"

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
        UserEntity,
        RoleEntity
    ],
    migrations: [
        CreateUsersTable1679828897580,
        CreateRolesTable1679946949469,
        CreateTokensTable1679977778839
    ]
})