import nodemailer from "nodemailer";

class EmailService {
    transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "admin@algotrades.io",
                pass: "CE1f2b26-07Cd-4482-8392-4Cb5C0C6a0D3",
            },
        });
    }

    async sendMail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: `Admin admin@algotrades.io`,
            to,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(`Error sending mail: ${error}`);
        }
    }

    // When a user logs in
    async sendLoginNotification(user: any) {
        const subject = "New Login Notification";
        const text = `
      Hello, ${user.username}!

      We noticed a new login to your account.

      If this wasn't you, please contact support immediately.

      This is an automated message. Please do not reply.
    `;
        await this.sendMail(user.email, subject, text);
    }

    // When a user registers
    async sendRegistrationConfirmation(user: any) {
        const subject = "Welcome to Our Service!";
        const text = `
      Welcome, ${user.username}!

      Thank you for registering with us.
      You can now access your account and enjoy our services.

      This is an automated message. Please do not reply.
    `;
        await this.sendMail(user.email, subject, text);
    }

    // When a user requests a deposit
    async sendDepositStatusUpdate(user: any, amount: number, status: string) {
        const userSubject = `Your deposit has been ${status}`;
        const userMessage = `
      Hello, ${user.username}!

      Your deposit of ${amount} has been ${status}.
      Please check your account for more details.

      This is an automated message. Please do not reply.
    `;

        const adminSubject = `Deposit ${status} notification for user ${user.username}`;
        const adminMessage = `
      Deposit ${status} Notification

      User: ${user.username}
      Amount: ${amount}
      The deposit has been ${status}. Please review the transaction in the admin panel.

      This is an automated message. Please do not reply.
    `;

        // Send the emails simultaneously
        await Promise.all([
            this.sendMail(user.email, userSubject, userMessage),
            this.sendMail(
                "epushisirohms@gmail.com",
                adminSubject,
                adminMessage
            ),
        ]);
    }

    // When a user requests a withdrawal
    async sendDepositRequest(user: any, amount: number) {
        const subject = "Deposit Request Received";
        const text = `
      Withdrawal Request

      Hello ${user.username},

      Your request to deposit ${amount} USD has been received and is awaiting approval.

      This is an automated message. Please do not reply.
    `;
        await this.sendMail(user.email, subject, text);
    }

    // Notify admin about the deposit request
    async notifyAdminAboutDeposit(user: any, amount: number) {
        const subject = "New Deposit Request";
        const text = `
      New Deposit Request

      ${user.username} has requested a deposit of ${amount} USD.
      Please review and approve the deposit.

      This is an automated message. Please do not reply.
    `;
        await this.sendMail("epushisirohms@gmail.com", subject, text);
    }

    // When an admin approves the withdrawal
    async sendWithdrawalStatusUpdate(
        user: any,
        amount: number,
        status: string
    ) {
        const subject = `Withdrawal Request ${
            status === "approved" ? "Approved" : "Declined"
        }`;
        const userText = `
      Withdrawal ${status === "approved" ? "Approved" : "Declined"}

      Hello ${user.username},

      Your withdrawal of ${amount} has been ${status}.
      ${
          status === "approved"
              ? "Your funds will be credited to your account shortly."
              : "Unfortunately, your request has been declined. Please contact support if you have questions."
      }

      This is an automated message. Please do not reply.
    `;

        const adminText = `
      Withdrawal Request ${status === "approved" ? "Approved" : "Declined"}

      The withdrawal of ${amount} for user ${user.username} (${
            user.email
        }) has been ${status}.
      Status: ${status.toUpperCase()}

      This is an automated message. Please do not reply.
    `;

        // Send email to the user
        await this.sendMail(user.email, subject, userText);

        // Send email to the admin (replace with your admin email)
        const adminEmail = "epushisirohms@gmail.com"; // Update this to the actual admin email
        await this.sendMail(adminEmail, subject, adminText);
    }

    // When a user requests a withdrawal
    async sendWithdrawalRequest(user: any, amount: number) {
        const subject = "Withdrawal Request Received";
        const text = `
      Withdrawal Request

      Hello ${user.username},

      Your request to withdraw ${amount} USD has been received and is awaiting approval.

      This is an automated message. Please do not reply.
    `;
        await this.sendMail(user.email, subject, text);
    }

    // Notify admin about the withdrawal request
    async notifyAdminAboutWithdrawal(user: any, amount: number) {
        const subject = "New Withdrawal Request";
        const text = `
      New Withdrawal Request

      ${user.username} has requested a withdrawal of ${amount} USD.
      Please review and approve the withdrawal.

      This is an automated message. Please do not reply.
    `;
        await this.sendMail("epushisirohms@gmail.com", subject, text);
    }

    // When a user changes their password
    async sendPasswordChangeNotification(user: any) {
        const subject = "Password Changed Successfully";
        const text = `
      Password Changed

      Hello ${user.username},

      Your account password has been successfully changed.
      If this wasn't you, please contact support immediately.

      This is an automated message. Please do not reply.
    `;
        await this.sendMail(user.email, subject, text);
    }

    // When a user requests a password reset
    async sendPasswordResetRequest(user: any, resetLink: string) {
        const subject = "Password Reset Request";
        const text = `
      Password Reset Request

      Hello ${user.username},

      We received a request to reset your password. Click the link below to reset your password:
      ${resetLink}

      If you didn't request this, please ignore this email.

      This is an automated message. Please do not reply.
    `;
        await this.sendMail(user.email, subject, text);
    }
}

export default EmailService;
