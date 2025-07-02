// src/application/validators/userValidator.ts
import { z } from "zod";

// Base user schema
const baseUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

// For creating user: password required
export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// For updating user: all optional but validated if present
export const updateUserSchema = baseUserSchema
  .partial()
  .extend({
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
  });
