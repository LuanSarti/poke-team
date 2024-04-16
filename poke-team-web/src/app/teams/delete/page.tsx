"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Delete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  async function deleteTeam() {
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams"],
    queryFn: deleteTeam,
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

  router.back();

  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      <h1>hello delete</h1>
    </main>
  );
}
