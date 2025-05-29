import "dotenv/config";
import nodemailer from "nodemailer";
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
    generateAdminProfileUpdateNotification,
} from "./emailTemplates";

const ADMIN_EMAIL = "Support <support@algotrades.io>"; // Replace with actual admin email

class EmailService {
    transporter: nodemailer.Transporter;

    constructor() {
        // Set up nodemailer transporter with Postmark SMTP settings
        this.transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: "support@algotrades.io",
                pass: "Pass1@algotrades.io",
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        try {
            console.log(`Sending email to: ${to} with subject: ${subject}`);
            const response = await this.transporter.sendMail({
                from: ADMIN_EMAIL,
                to: to,
                subject: subject,
                html: html,
                text: html.replace(/<[^>]*>/g, ""), // Optional: generate plain text from HTML
                headers: {
                    "X-PM-Message-Stream": "outbound", // Specify message stream
                },
            });
            console.log("Email sent successfully:", response);
        } catch (error) {
            console.error(`Error sending mail: ${JSON.stringify(error)}`);
        }
    }

    // User login notification
    async sendLoginNotification(user: any) {
        const template = generateLoginEmail(user.fullName);
        await this.sendMail(user.email, "New Login Notification", template);
    }
    // User profile update notification
    async sendProfileUpdatedNotification(user: any) {
        const template = generateAdminProfileUpdateNotification(user.fullName);
        await this.sendMail(
            user.email,
            "Profile Updated Notification",
            template
        );
    }

    // User registration confirmation
    async sendRegistrationConfirmation(user: any, token: number) {
        const template = generateRegistrationEmail(user.fullName, token);
        await this.sendMail(
            user.email,
            "Welcome to Algotrades - Please Verify Your Email",
            template
        );
    }

    // User deposit status update
    async sendDepositStatusUpdate(user: any, amount: number, status: string) {
        const template = generateDepositStatusEmail(
            user.fullName,
            amount,
            status
        );
        await this.sendMail(user.email, "Deposit Status Update", template);
    }

    // User deposit request
    async sendDepositRequest(user: any, amount: number) {
        const template = generateDepositRequestEmail(user.fullName, amount);
        await this.sendMail(user.email, "Deposit Request Received", template);
    }

    // Notify admin about deposit request
    async notifyAdminAboutDeposit(user: any, amount: number) {
        const template = generateAdminDepositNotification(
            user.fullName,
            amount
        );
        await this.sendMail(ADMIN_EMAIL, "New Deposit Request", template);
    }

    async notifyAdminAboutProfileUpdate(user: any) {
        const template = generateAdminProfileUpdateNotification(user.fullName);
        await this.sendMail(ADMIN_EMAIL, "User Profile Updated", template);
    }

    // Withdrawal status update
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

    // Withdrawal request
    async sendWithdrawalRequest(user: any, amount: number) {
        const template = generateWithdrawalRequestEmail(user.fullName, amount);
        await this.sendMail(
            user.email,
            "Withdrawal Request Received",
            template
        );
    }

    // Notify admin about withdrawal request
    async notifyAdminAboutWithdrawal(user: any, amount: number) {
        const template = generateAdminWithdrawalNotification(
            user.fullName,
            amount
        );
        await this.sendMail(ADMIN_EMAIL, "New Withdrawal Request", template);
    }

    // Password change notification
    async sendPasswordChangeNotification(user: any) {
        const template = generatePasswordChangeNotification(user.fullName);
        await this.sendMail(
            user.email,
            "Password Change Notification",
            template
        );
    }

    // Password reset request
    async sendPasswordResetRequest(user: any, resetLink: string) {
        const template = generatePasswordResetEmail(user.fullName, resetLink);
        await this.sendMail(user.email, "Password Reset Request", template);
    }
}

export default EmailService;
