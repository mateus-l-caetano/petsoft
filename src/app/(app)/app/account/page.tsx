import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutButton from "@/components/sign-out-btn";
import { checkAuth } from "@/lib/server-utils";

export default async function Page() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="my-8 text-white">Sua conta</H1>
      <ContentBlock className="flex flex-col gap-3 justify-center items-center h-[500px]">
        <p>
          Logado como <span className="font-bold">{session.user.email}</span>
        </p>

        <SignOutButton />
      </ContentBlock>
    </main>
  );
}
