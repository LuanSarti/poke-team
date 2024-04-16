"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

interface Ipokemon {
  name: string;
  id: number;
  sprites: object;
}

export default function Pokedex() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  async function listPokemons(page: string) {
    const offset = (Number(page) - 1) * 20;

    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}pokemon/list/${offset}`,
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

  const handleSearch = (value: string) => {
    if (Number(value) < 1) value = "1";
    if (Number(value) > 51) value = "51";
    const params = new URLSearchParams(searchParams);
    params.set("page", value);

    replace(`${pathname}?${params.toString()}`);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => listPokemons(page ?? "1"),
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
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header route="teams" description="Times" />
      <main className="flex flex-col">
        <div className="container flex flex-1 flex-col justify-center">
          <div className="mb-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer rounded-full"
                    onClick={() =>
                      handleSearch((+(page ?? "2") - 1).toString())
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className="cursor-pointer rounded-full"
                    onClick={() => handleSearch("1")}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className="cursor-pointer rounded-full"
                    onClick={() => handleSearch("2")}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className="cursor-pointer rounded-full"
                    onClick={() => handleSearch("3")}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationLink
                  className="cursor-pointer rounded-full"
                  onClick={() => handleSearch("51")}
                >
                  51
                </PaginationLink>
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer rounded-full"
                    onClick={() =>
                      handleSearch((+(page ?? "1") + 1).toString())
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <section className="flex flex-wrap justify-center gap-8">
            {data.map(({ id, name, sprites }: Ipokemon) => (
              <Card
                className="w-[15%] rounded-xl bg-neutral-300 opacity-80"
                key={id}
              >
                <CardHeader>
                  <span className="text-black">{`Nº ${id}`}</span>
                  <span className="text-black">{name}</span>
                </CardHeader>
                <CardContent>
                  <Image
                    width={200}
                    height={200}
                    alt={name}
                    src={sprites.front_default}
                  />
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
