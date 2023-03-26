import {DataSource} from "typeorm"
import * as dotenv from "dotenv"

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
        
    ],
})