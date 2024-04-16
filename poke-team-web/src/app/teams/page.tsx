"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { revalidatePath } from "next/cache";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { redirect, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import Pokemon from "@/components/Pokemon";
import { useState } from "react";
import HandleRefresh from "@/components/HandleRefresh";

interface Iteam {
  id: number;
  name: string;
  pokemon_1: number;
  pokemon_2: number;
  pokemon_3: number;
  pokemon_4: number;
  pokemon_5: number;
}

export default function Teams() {
  const [teamId, setTeamId] = useState<number>();

  const router = useRouter();

  async function deleteTeam(id: number | undefined) {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}team/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      const response = await request.json();

      if (request.status !== 200) throw new Error(response.message);

      return response;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  async function findTeams() {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}team/${sessionStorage.getItem("id")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      const response = await request.json();

      if (request.status !== 200) throw new Error(response.message);

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const { data: deleteData } = useQuery({
    queryKey: ["delete", teamId],
    queryFn: () => {
      {
        return deleteTeam(teamId);
      }
    },
    enabled: !!teamId,
  });

  const {
    data: teamsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: findTeams,
  });

  if (isLoading) {
    return <main className="mt-4 flex justify-center">Carregando...</main>;
  }

  if (isError) {
    return (
      <main className="mt-4 flex justify-center">
        <Toaster position="top-center" reverseOrder={false} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Header route="pokedex" description="Pokedex" />
      <div className="container flex-1">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl">Meus Times</h1>
          <span
            onClick={() => router.push("/teams/register")}
            className="cursor-pointer rounded-full border-2 border-white "
          >
            <FaPlus size={25} />
          </span>
        </div>
        <section className="mt-8 flex flex-wrap justify-center gap-8">
          {teamsData?.map(
            ({
              id,
              name,
              pokemon_1,
              pokemon_2,
              pokemon_3,
              pokemon_4,
              pokemon_5,
            }: Iteam) => (
              <Card
                className="w-[40%] rounded-xl bg-neutral-300 opacity-80"
                key={id}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span className="text-black">{name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="rounded-full border-0 bg-neutral-300 hover:bg-neutral-300"
                          variant="outline"
                        >
                          <HiOutlineDotsVertical
                            className="text-black"
                            size={25}
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-24">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Button
                              className="w-full"
                              onClick={() =>
                                router.push(`/teams/update?id=${id}`)
                              }
                              type="button"
                            >
                              Atualizar
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button
                              className="w-full"
                              onClick={() => {
                                setTeamId(id);
                                deleteData;
                                toast.success("Deletado com sucesso");
                                <HandleRefresh />;
                              }}
                              type="button"
                            >
                              Apagar
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full justify-center gap-8">
                    <Pokemon id={pokemon_1} />
                    <Pokemon id={pokemon_3} />
                    <Pokemon id={pokemon_5} />
                  </div>
                  <div className="flex w-full justify-center gap-8">
                    <Pokemon id={pokemon_2} />
                    <Pokemon id={pokemon_4} />
                  </div>
                </CardContent>
              </Card>
            ),
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}
