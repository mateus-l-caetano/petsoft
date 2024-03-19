import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type AuthFormButtonProps = {
  type: "logIn" | "signUp";
};

export default function AuthFormButton({ type }: AuthFormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="">
      {type === "logIn" ? "Entrar" : "Criar"}
    </Button>
  );
}
