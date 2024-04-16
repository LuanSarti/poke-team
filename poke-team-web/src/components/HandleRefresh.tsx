import { useRouter } from "next/router";
import Router from "next/router";

export default function HandleRefresh() {
  const router = useRouter();

  return (
    <div
      onLoad={() => {
        router.reload();
      }}
    ></div>
  );
}
