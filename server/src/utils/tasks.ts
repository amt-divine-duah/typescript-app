import { MailService } from "../services/mailService";

export function sendConfirmationEmail(job) {
  console.log("sending mail");
  MailService.sendEmail({
    from: job.data.senderEmail,
    to: job.data.userEmail,
    subject: "Confirm Your Account",
    html: job.data.html,
  });
}
