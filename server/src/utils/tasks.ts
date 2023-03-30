import { MailService } from "../services/mailService";

export function sendMail(job) {
  console.log("sending mail");
  MailService.sendEmail({
    from: job.data.senderEmail,
    to: job.data.userEmail,
    subject: job.data.subject,
    html: job.data.html,
  });
}
