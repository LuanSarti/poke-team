"use client";

import InputFild from "@/components/InputFild";
import { Button } from "@/components/ui/button";
import { fetchOptions } from "@/utils/fetchOptions";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: object) => {
      try {
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}auth/login`,
          fetchOptions("POST", formData),
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

  function login(formData: FormData) {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    mutation.mutate(rawFormData, {
      onSuccess: (data) => {
        if (data.error) {
          toast.error(data.message);
        }

        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("id", data.data.user.id);

        router.push("/pokedex");
      },
    });
  }

  return (
    <main className="h-screen w-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container flex h-full items-center justify-center">
        <form
          className="w-[50%] rounded-[20px] bg-neutral-950 px-12 pb-4 pt-12 text-2xl shadow-2xl"
          action={login}
        >
          <legend className="w-full text-center">Login</legend>
          <InputFild id="email" label="e-mail" type="email" />
          <InputFild id="password" label="senha" type="password" />
          <div className="flex w-full justify-center">
            <Button className="mt-8 rounded" size={"lg"} type="submit">
              Entrar
            </Button>
          </div>
          <div className="flex w-full justify-center">
            <Button
              type="button"
              className="animation mt-2 bg-neutral-950 text-foreground hover:bg-neutral-950 hover:text-neutral-400"
              onClick={() => {
                router.push("/register");
              }}
            >
              Cirar conta
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
