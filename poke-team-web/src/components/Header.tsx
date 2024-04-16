"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface Iprops {
  route: string;
  description: string;
}

export default function Header({ route, description }: Iprops) {
  const router = useRouter();

  function logout() {
    sessionStorage.clear();

    router.push("/");
  }

  function navigateTeams() {
    router.push(`/${route}`);
  }

  return (
    <>
      <header className="relative mb-12 flex h-14 w-full items-center justify-center bg-blue-700">
        <h2 className="text-2xl text-amber-300">PokéTeam</h2>
        <Button
          className="animation absolute right-[500px] rounded bg-neutral-700 text-lg text-neutral-100 hover:bg-neutral-500"
          onClick={logout}
        >
          Sair
        </Button>
        <Button
          className="animation absolute left-[500px] rounded bg-neutral-700 text-lg text-neutral-100 hover:bg-neutral-500"
          onClick={navigateTeams}
        >
          {description}
        </Button>
      </header>
    </>
  );
}
