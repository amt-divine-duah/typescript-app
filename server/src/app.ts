import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";


export default function configureApp() {

    const app: Application = express();

    // region middlewares
    app.use(cors()); // Enable cors (Cross-Origin Resource Sharing (CORS))
    app.use(morgan("dev"));  // print in the dev console, all requests coming intoo the app
    app.use(bodyParser.json()); //  parses incoming requests with JSON payloads

    // end middlewares

    app.get("/hello", (req, res, next) => {

        return res.status(200).json({
            message: "Hello World"
        })
    })


    return app
}