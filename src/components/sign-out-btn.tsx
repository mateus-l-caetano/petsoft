"use client";

import { logOut } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await logOut();
        });
      }}
    >
      Sair
    </Button>
  );
}
