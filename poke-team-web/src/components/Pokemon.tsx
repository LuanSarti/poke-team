import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

interface Iprops {
  id: number;
}
export default function Pokemon({ id }: Iprops) {
  async function findPokemon(id: any) {
    try {
      const request = await fetch(
        `http://127.0.0.1:8000/api/pokemon/find/${id}`,
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

  const { data, isError } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => {
      return findPokemon(id);
    },
    enabled: !!id,
    staleTime: Infinity,
  });

  if (isError) {
    return (
      <main className="mt-4 flex justify-center">
        <Toaster position="top-center" reverseOrder={false} />
      </main>
    );
  }

  return (
    <div>
      <Image
        width={100}
        height={100}
        alt={data?.name ?? "No pokémon"}
        src={
          data?.sprites.front_default ??
          "https://xv.imgix.net/photos/xv/pokemon-go-6ec43470e21e702e39d9ff67a19018d0.png?auto=format%2Ccompress&cs=srgb&fit=max&q=60&w=320&s=baf0a87aabb3a0daf441d381f11cd9bb"
        }
      />
    </div>
  );
}
