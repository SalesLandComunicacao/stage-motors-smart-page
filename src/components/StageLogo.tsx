import Image from "next/image";
import logoImg from "./image-removebg-preview.png";

export function StageLogo({ className = "h-10" }: { className?: string }) {
  return (
    <Image
      src={logoImg}
      alt="Stage Motors"
      className={`object-contain ${className}`}
      priority
    />
  );
}
