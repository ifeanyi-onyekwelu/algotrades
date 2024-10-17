import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import {
    generateDepositRequestEmail,
    generateWithdrawalRequestEmail,
    generateAdminDepositNotification,
    generateAdminWithdrawalNotification,
    generateDepositStatusEmail,
    generateWithdrawalStatusEmail,
    generateLoginEmail,
    generateRegistrationEmail,
    generatePasswordChangeNotification,
    generatePasswordResetEmail,
} from "./emailTemplates";

const ADMIN_EMAIL = "admin@algotrades.io"; // Replace with actual admin email

class EmailService {
    transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailersend.net",
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        const mailOptions = {
            from: '"Admin" <admin@algotrades.io>',
            to,
            subject,
            html,
        };

        try {
            console.log("Sending email...");
            await this.transporter.sendMail(mailOptions);
        } catch (error: any) {
            console.log(`Error sending mail: ${error}`);
        }
    }

    // When a user logs in
    async sendLoginNotification(user: any) {
        const template = generateLoginEmail(user.fullName);
        await this.sendMail(user.email, "New Login Notification", template);
    }

    // When a user registers
    async sendRegistrationConfirmation(user: any, token: number) {
        const template = generateRegistrationEmail(user.fullName, token);
        await this.sendMail(
            user.email,
            "Welcome to Algotrades - Please Verify Your Email",
            template
        );
    }

    // When a user requests a deposit
    async sendDepositStatusUpdate(user: any, amount: number, status: string) {
        const template = generateDepositStatusEmail(
            user.fullName,
            amount,
            status
        );
        await this.sendMail(user.email, "Deposit Status Update", template);
    }

    // When a user requests a deposit
    async sendDepositRequest(user: any, amount: number) {
        const template = generateDepositRequestEmail(user.fullName, amount);
        await this.sendMail(user.email, "Deposit Request Received", template);
    }

    // Notify admin about the deposit request
    async notifyAdminAboutDeposit(user: any, amount: number) {
        const template = generateAdminDepositNotification(
            user.fullName,
            amount
        );
        await this.sendMail(ADMIN_EMAIL, "New Deposit Request", template); // Ensure to send to admin email
    }

    // When an admin approves the withdrawal
    async sendWithdrawalStatusUpdate(
        user: any,
        amount: number,
        status: string
    ) {
        const template = generateWithdrawalStatusEmail(
            user.fullName,
            amount,
            status
        );
        await this.sendMail(user.email, "Withdrawal Status Update", template);
    }

    // When a user requests a withdrawal
    async sendWithdrawalRequest(user: any, amount: number) {
        const template = generateWithdrawalRequestEmail(user.fullName, amount);
        await this.sendMail(
            user.email,
            "Withdrawal Request Received",
            template
        );
    }

    // Notify admin about the withdrawal request
    async notifyAdminAboutWithdrawal(user: any, amount: number) {
        const template = generateAdminWithdrawalNotification(
            user.fullName,
            amount
        );
        await this.sendMail(ADMIN_EMAIL, "New Withdrawal Request", template); // Ensure to send to admin email
    }

    // When a user changes their password
    async sendPasswordChangeNotification(user: any) {
        const template = generatePasswordChangeNotification(user.fullName);
        await this.sendMail(
            user.email,
            "Password Change Notification",
            template
        );
    }

    // When a user requests a password reset
    async sendPasswordResetRequest(user: any, resetLink: string) {
        const template = generatePasswordResetEmail(user.fullName, resetLink);
        await this.sendMail(user.email, "Password Reset Request", template);
    }
}

export default EmailService;
