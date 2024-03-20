"use client";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PetList() {
  const { pets, handleChangeSelectedPetId, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  let filteredPets;
  if (pets) {
    filteredPets = pets.filter((pet) =>
      pet.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets && filteredPets.length > 0 ? (
        filteredPets.map((pet) => (
          <li key={pet.id}>
            <button
              onClick={() => handleChangeSelectedPetId(pet.id)}
              className={cn(
                "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3  hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
                { "bg-[#EFF1F2]": pet.id === selectedPetId }
              )}
            >
              <Image
                src={pet.imageUrl}
                alt="Pet image"
                width={45}
                height={45}
                className="w-[45px] h-[45px] rounded-full object-cover"
              />
              <p className="font-semibold">{pet.name}</p>
            </button>
          </li>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg text-center w-full m-auto">
            Nenhum pet encontrado
          </p>
        </div>
      )}
    </ul>
  );
}
