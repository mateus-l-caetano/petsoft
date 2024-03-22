"use server";

import prisma from "@/lib/db";
import { checkAuth, getPetByPetId } from "@/lib/server-utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function addPet(newPet: unknown) {
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return {
      message: "Dados inválidos.",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidatePath("/app", "layout");
  } catch (e) {
    return {
      message:
        "Não foi possível adicionar o pet. Por favor, tente novamente mais tarde",
    };
  }
}

export async function editPet(petId: unknown, newPetData: unknown) {
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: "Dados inválidos",
    };
  }

  const pet = await getPetByPetId(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet não encontrado",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Você não pode editar este pet",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (e) {
    return {
      message:
        "Não foi possível editar o pet. Por favor, tente novamente mais tarde",
    };
  }

  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: unknown) {
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Dados inválidos",
    };
  }

  const pet = await getPetByPetId(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet não encontrado",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Você não pode excluir este pet",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });

    revalidatePath("/app", "layout");
  } catch (e) {
    return {
      message:
        "Não foi possível excluir o pet. Por favor, tente novamente mais tarde",
    };
  }
}
