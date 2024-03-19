import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Cadastre-se</H1>
      <AuthForm type="signUp" />
      <p className="mt-6 text-sm text-zinc-500">
        Já possui uma conta?{" "}
        <Link className="font-medium" href="/login">
          Entre
        </Link>
        .
      </p>
    </main>
  );
}
