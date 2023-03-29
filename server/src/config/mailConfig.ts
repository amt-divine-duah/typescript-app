import nodemailer from "nodemailer";
import configValues from "./config";

export const mailConfig = nodemailer.createTransport({
    service: "gmail",
    host: configValues.MAIL_HOST,
    port: Number(configValues.MAIL_PORT),
    secure: false,
    auth: {
        user: configValues.MAIL_USERNAME,
        pass: configValues.MAIL_PASSWORD,
    }
})