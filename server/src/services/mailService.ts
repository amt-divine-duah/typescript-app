import configValues from "../config/config";
import { mailConfig } from "../config/mailConfig";
import { MailInterface } from "../interfaces/mailInterface";


export class MailService {

    // method to send email
    static async sendEmail(options: MailInterface) {
        try {
            const info = await mailConfig.sendMail({
                from: configValues.MAIL_DEFAULT_SENDER || options.from,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
            })
            console.log(`Message was delivered successfully, ${info.response}`)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}