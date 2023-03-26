import configureApp from "./app";
import * as dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

// Set up database connection
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Create instance of app
const app = configureApp();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
