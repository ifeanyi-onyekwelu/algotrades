const LOGO_URl =
    "https://res.cloudinary.com/dr2z4ackb/image/upload/v1729030887/en8fcrwbq9anqtdufql0.png";

export function generateRegistrationEmail(fullName: string, token: number) {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Algotrades!</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                    .content { padding: 20px; }
                    .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                    .footer a { margin: 0 10px; text-decoration: none; color: #333; }
                    .btn { display: block; padding: 10px; background-color: #333; color: #fff; text-decoration: none; border-radius: 2px; text-align: center; font-size: 2.5rem; font-weight: bold;}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src=${LOGO_URl} alt="Company Logo" style="max-width: 200px;">
                        <h1>Welcome, ${fullName}!</h1>
                    </div>
                    <div class="content">
                        <p>Thank you for registering with Algotrades. We are excited to have you join us!</p>
                        <p>To complete your registration, please verify your email address by copying the code below:</p>
                        <p class="btn">${token}</p>
                        <p>If you did not create this account, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated email. Please do not reply.</p>
                        <p>
                            <a href="https://algotrades.io/">Privacy Policy</a> | 
                            <a href="https://algotrades.io/">Terms of Service</a> | 
                            <a href="https://algotrades.io/">Contact Us</a>
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;
}

export function generateLoginEmail(fullName: string) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Our Service!</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 {color: #333;}
                .header { background-color: #fffff; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
               <div class="header">
                    <img src="${LOGO_URl}" alt="Company Logo" style="max-width: 200px;">
                    <h1>Dear, ${fullName}!</h1>
                </div>
                <div class="content">
                    <p>Thank you for logging in to your account! We're excited to have you back.</p>
                    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                    <p>Enjoy exploring your dashboard and all the features we offer!</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Deposit Status Update Email Template
export function generateDepositStatusEmail(
    fullName: string,
    depositAmount: number,
    status: string
) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deposit Status Update</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${LOGO_URl}" alt="Company Logo" style="max-width: 200px;">
                    <h1>Hi ${fullName},</h1>
                </div>
                <div class="content">
                    <p>Your deposit of $${depositAmount} has been ${status}.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Withdrawal Status Update Email Template
export function generateWithdrawalStatusEmail(
    fullName: string,
    withdrawalAmount: number,
    status: string
) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Withdrawal Status Update</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${LOGO_URl}" alt="Company Logo" style="max-width: 200px;">
                    <h1>Hi ${fullName},</h1>
                </div>
                <div class="content">
                    <p>Your withdrawal of $${withdrawalAmount} has been ${status}.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Profit Update Email Template
export function generateProfitUpdateEmail(
    fullName: string,
    profitAmount: number
) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Profit Update</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${LOGO_URl}" alt="Company Logo" style="max-width: 200px;">
                    <h1>Hi ${fullName},</h1>
                </div>
                <div class="content">
                    <p>Your profit amount is now $${profitAmount}.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Deposit Request Email Template
export function generateDepositRequestEmail(
    fullName: string,
    depositAmount: number
) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deposit Request Confirmation</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${LOGO_URl}" alt="Company Logo" style="max-width: 200px;">
                    <h1>Hi ${fullName},</h1>
                </div>
                <div class="content">
                    <p>Your deposit request of $${depositAmount} has been received.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Withdrawal Request Email Template
export function generateWithdrawalRequestEmail(
    fullName: string,
    withdrawalAmount: number
) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Withdrawal Request Confirmation</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${LOGO_URl}" alt="Company Logo" style="max-width: 200px;">
                    <h1>Hi ${fullName},</h1>
                </div>
                <div class="content">
                    <p>Your withdrawal request of $${withdrawalAmount} has been received.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Admin Deposit Notification Email Template
export function generateAdminDepositNotification(
    fullName: string,
    depositAmount: number
) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Deposit Request</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Deposit Request</h1>
                </div>
                <div class="content">
                    <p>User <strong>${fullName}</strong> has requested a deposit of $${depositAmount}.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Admin Withdrawal Notification Email Template
export function generateAdminWithdrawalNotification(
    fullName: string,
    withdrawalAmount: number
) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Withdrawal Request</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Withdrawal Request</h1>
                </div>
                <div class="content">
                    <p>User <strong>${fullName}</strong> has requested a withdrawal of $${withdrawalAmount}.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export function generatePasswordResetEmail(
    fullName: string,
    resetLink: string
) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset Request</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${LOGO_URl}" alt="Company Logo" style="max-width: 200px;">
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <p>Dear ${fullName},</p>
                    <p>We received a request to reset your password. Click the button below to proceed:</p>
                    <p style="text-align: center;">
                        <a href="${resetLink}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    </p>
                    <p>If you didn’t request this, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export function generatePasswordChangeNotification(fullName: string) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Change Notification</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; }
                .footer a { margin: 0 10px; text-decoration: none; color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${LOGO_URl}" alt="Company Logo" style="max-width: 200px;">
                    <h1>Password Change Notification</h1>
                </div>
                <div class="content">
                    <p>Dear ${fullName},</p>
                    <p>Your password was successfully changed.</p>
                    <p>If this wasn't you, please contact our support team immediately.</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply.</p>
                    <p>
                        <a href="https://algotrades.io/">Privacy Policy</a> | 
                        <a href="https://algotrades.io/">Terms of Service</a> | 
                        <a href="https://algotrades.io/">Contact Us</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}
