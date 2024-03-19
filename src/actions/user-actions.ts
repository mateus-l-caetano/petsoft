"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { authSchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function logIn(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials",
          };
        }

        default: {
          return {
            message: "Could not sign in",
          };
        }
      }
    }

    throw e;
  }
}

export async function signUp(prevState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const formDataEntries = Object.fromEntries(formData.entries());

  const validatedFormData = authSchema.safeParse(formDataEntries);

  if (!validatedFormData.success) {
    console.log(validatedFormData.error);
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedFormData.data;

  const authData = {
    email,
    hashedPassword: await bcrypt.hash(password, 10),
  };

  try {
    await prisma.user.create({
      data: authData,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          message: "User already exists",
        };
      }
    }

    console.error(err);
    return {
      message: "Could not create user",
    };
  }

  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}
