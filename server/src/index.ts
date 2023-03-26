import configureApp from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.APP_PORT || 3000;



// Create instance of app
const app = configureApp()

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})