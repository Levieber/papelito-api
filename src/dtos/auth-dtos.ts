import { User } from "@prisma/client";
import { z, type Schema } from "zod";

export const signUpDtoSchema: Schema<Omit<User, "id">> = z.object({
  name: z.string().trim(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpDto = z.infer<typeof signUpDtoSchema>

export const signInDtoSchema: Schema<Omit<User, "id" | "name">> = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInDto = z.infer<typeof signInDtoSchema>

