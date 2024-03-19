import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      {/* <Image src="/public/marketing.png" alt="Logo" width={519} height={472} /> */}
      <div className="flex flex-col items-center xl:items-start">
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Gerencie seu <span className="font-extrabold">hotel para pets</span>{" "}
          com facilidade.
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft para gerenciar facilmente os pets sobre os seus cuidados!
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Comece aqui</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Entrar</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
