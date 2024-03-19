import { DEFAULT_IMAGE_URL } from "@/lib/constants";
import { z } from "zod";

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(15),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(30),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Invalid image url" }),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive()
      .max(999, { message: "Invalid age" }),
    notes: z.union([
      z.literal(""),
      z.string().trim().max(1000, { message: "Notes too long" }),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_IMAGE_URL,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;
