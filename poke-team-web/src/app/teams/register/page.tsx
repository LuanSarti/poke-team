"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InputFild from "@/components/InputFild";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchOptions } from "@/utils/fetchOptions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: object) => {
      try {
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}team`,
          fetchOptions(
            "POST",
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
        }
        toast.success(data.message);
      },
    });
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
            defaultValue="Novo time"
          />
          <div className="my-8 flex justify-center gap-20">
            <InputFild id="pokemon_1" label="pokémon 1" type="number" />
            <InputFild id="pokemon_2" label="pokémon 2" type="number" />
            <InputFild id="pokemon_3" label="pokémon 3" type="number" />
          </div>
          <div className="my-8 flex  justify-center gap-20">
            <InputFild id="pokemon_4" label="pokémon 4" type="number" />
            <InputFild id="pokemon_5" label="pokémon 5" type="number" />
          </div>
          <div className="mt-16 flex w-full items-center justify-center">
            <Button className="mt-8 rounded" type="submit">
              Criar time
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}
