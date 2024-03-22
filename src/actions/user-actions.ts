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
            message: "Credenciais inválidas.",
          };
        }

        default: {
          return {
            message: "Não foi possível realizar o login.",
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
      message: "Dados inválidos.",
    };
  }

  const formDataEntries = Object.fromEntries(formData.entries());

  const validatedFormData = authSchema.safeParse(formDataEntries);

  if (!validatedFormData.success) {
    console.log(validatedFormData.error);
    return {
      message: "Dados inválidos.",
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
          message: "Usuário já cadastrado.",
        };
      }
    }

    console.error(err);
    return {
      message: "Não foi possível realizar o cadastro.",
    };
  }

  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}
