import { z } from "zod";

export const fullNameSchema = z
    .string()
    .min(1, "Full name is required")
    .refine((value) => value.trim().split(" ").length >= 2, {
        message: "Full name must include both first and last name",
    });

export const usernameSchema = z.string().min(2, "Username is required");

export const emailSchema = z
    .string()
    .email("Please enter a valid email address");

export const phoneNumberSchema = z
    .string()
    .min(7, "Please enter a valid phone number");

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((value) => /[a-z]/.test(value), {
        message: "Password must contaiin at least one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contaiin at least one uppercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
        message: "Password must contaiin at least one number",
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
        message:
            "Password must contaiin at least one special character (!@#$%^&*)",
    });

export const registrationSchema = z.object({
    fullName: fullNameSchema,
    username: usernameSchema,
    phoneNumber: phoneNumberSchema,
    email: emailSchema,
    password: passwordSchema,
});
