import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30).optional(),
  password: z.string().min(8), // plain password or hashed? Ideally hashed before saving
  full_name: z.string().min(1),
  phone_number: z.string().optional().nullable(),
  fingerprints: z.array(z.string()).optional().nullable(), // assuming array of strings (e.g. device IDs or hashes)
});

export const updateUserSchema = z.object({
  // email: z.string().email().optional(),
  // username: z.string().min(3).max(30).optional(),
  // password: z.string().min(8).optional(),
  // full_name: z.string().min(1).optional(),
  // phone_number: z.string().optional().nullable(),
  // fingerprints: z.array(z.string()).optional().nullable(),
});
