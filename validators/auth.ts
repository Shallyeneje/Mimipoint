import { z } from "zod";
import { imageSchema } from "./custom-validation";

export const Register = z.object({
  username: z.string().min(2),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export type RegisterCreateType = z.infer<typeof Register> & {
  role: string;
};

export const Login = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6),
});

export type LoginType = z.infer<typeof Login>;

export const ResetPassword = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export type ResetPasswordType = z.infer<typeof ResetPassword> & {
  token: string;
};

export const requesttoken = z.object({
  email: z.string().email("Invalid email format"),
});

export type RequestTokenType = z.infer<typeof requesttoken>;

// Define Zod schema
export const userSchema = z.object({
  user_details: z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
  }),
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  avatar: imageSchema,
  gender: z.enum(["Male", "Female"]),
  phone_number: z.string().min(10, "Invalid phone number"),
});

// TypeScript Type
export type UserFormType = z.infer<typeof userSchema>;
