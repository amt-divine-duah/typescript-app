import {DataSource} from "typeorm"
import { CreateUsersTable1679828897580 } from "./migrations/1679828897580-CreateUsersTable"
import { UserEntity } from "./entities/UserEntity"
import { CreateRolesTable1679946949469 } from "./migrations/1679946949469-CreateRolesTable"
import { RoleEntity } from "./entities/RoleEntity"
import { CreateTokensTable1679977778839 } from "./migrations/1679977778839-CreateTokensTable"
import { TokenEntity } from "./entities/TokenEntity"
import configValues from "../config/config"


// Set up database
export const AppDataSource = new DataSource({

    type: "postgres",
    host: configValues.DB_HOST,
    port: configValues.DB_PORT,
    username: configValues.DB_USERNAME,
    password: configValues.DB_PASSWORD,
    database: configValues.DB_DATABASE,
    logging: true,
    subscribers: [],
    entities: [
        RoleEntity,
        UserEntity,
        TokenEntity,
    ],
    migrations: [
        CreateUsersTable1679828897580,
        CreateRolesTable1679946949469,
        CreateTokensTable1679977778839,
    ]
})