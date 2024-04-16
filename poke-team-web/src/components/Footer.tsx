import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-12 flex h-20 w-full items-center justify-center gap-8 bg-blue-700">
      <Link target="_blank" href={"https://github.com/LuanSarti"}>
        <FaGithub size={50} />
      </Link>
      <Link
        target="_blank"
        href={"https://www.linkedin.com/in/luan-sarti-06495322b/"}
      >
        <FaLinkedin size={50} />
      </Link>
    </footer>
  );
}
