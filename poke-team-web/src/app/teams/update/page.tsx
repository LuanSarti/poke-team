"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InputFild from "@/components/InputFild";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchOptions } from "@/utils/fetchOptions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Update() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  async function findTeam() {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}team/find/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      const response = await request.json();

      if (request.status !== 200) throw new Error(response.message);

      console.log();

      return response;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const mutation = useMutation({
    mutationFn: async (formData: object) => {
      try {
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}team/${id}`,
          fetchOptions(
            "PUT",
            formData,
            `Bearer ${sessionStorage.getItem("token")}`,
          ),
        );
        const response = await request.json();

        if (request.status !== 200) throw new Error(response.message);

        return response;
      } catch (error) {
        if (error instanceof Error) {
          return { error: true, message: error.message };
        }
      }
    },
  });

  function register(formData: FormData) {
    const rawFormData = {
      user_id: formData.get("userId"),
      name: formData.get("name"),
      pokemon_1: formData.get("pokemon_1"),
      pokemon_2: formData.get("pokemon_2") ?? null,
      pokemon_3: formData.get("pokemon_3") ?? null,
      pokemon_4: formData.get("pokemon_4") ?? null,
      pokemon_5: formData.get("pokemon_5") ?? null,
    };

    mutation.mutate(rawFormData, {
      onSuccess: (data) => {
        if (data.error) {
          toast.error(data.message);
          return;
        }
        toast.success(data.message);
      },
    });
  }

  const {
    data: teamData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["team"],
    queryFn: findTeam,
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
      <Header route="teams" description="Times" />
      <div className="container flex flex-1 justify-center">
        <form className="w-full" action={register}>
          <Input
            className="hidden"
            readOnly
            type="number"
            name="userId"
            id="userId"
            defaultValue={sessionStorage.getItem("id") ?? 1}
          />
          <Input
            className="border-0 text-4xl"
            type="text"
            name="name"
            id="name"
            placeholder="Nome do time"
            defaultValue={teamData.data.name}
          />
          <div className="my-8 flex justify-center gap-20">
            <InputFild
              id="pokemon_1"
              label="pokémon 1"
              type="number"
              defaultValue={teamData.data.pokemon_1}
            />
            <InputFild
              id="pokemon_3"
              label="pokémon 3"
              type="number"
              defaultValue={teamData.data.pokemon_3}
            />
            <InputFild
              id="pokemon_5"
              label="pokémon 5"
              type="number"
              defaultValue={teamData.data.pokemon_5}
            />
          </div>
          <div className="my-8 flex  justify-center gap-20">
            <InputFild
              id="pokemon_2"
              label="pokémon 2"
              type="number"
              defaultValue={teamData.data.pokemon_2}
            />
            <InputFild
              id="pokemon_4"
              label="pokémon 4"
              type="number"
              defaultValue={teamData.data.pokemon_4}
            />
          </div>
          <div className="mt-16 flex w-full items-center justify-center">
            <Button className="mt-8 rounded" type="submit">
              Atualizar time
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}
