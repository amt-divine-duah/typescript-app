export function forgotPasswordTemplate(username: string, passwordVerificationUrl: string) {

    const html = `
    <p>Dear ${username},</p>
    <p>To reset your password
        <a href="${passwordVerificationUrl}">
            click here
        </a>.
    </p>
    <p>Alternatively, you can paste the following link in your browser's address bar:</p>
    <p>${passwordVerificationUrl}</p>
    <p>If you have not requested a password reset simply ignore this message.</p>
    <br>
    <p>Sincerely,</p>
    <p>Santa Dev</p>
    <p><small>Note: replies to this email address are not monitored.</small></p>`


    return {
        html: html
    }
}   