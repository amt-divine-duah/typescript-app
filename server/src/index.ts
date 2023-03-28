import "reflect-metadata";
import configureApp from "./app";
import { AppDataSource } from "./database/data-source";
import configValues from "./config/config";


const PORT = configValues.APP_PORT;

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
