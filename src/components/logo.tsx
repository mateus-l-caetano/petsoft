import Image from "next/image";
import Link from "next/link";
import logoImg from "../../public/logo.svg";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logoImg} alt="PetSoft logo" />
    </Link>
  );
}
