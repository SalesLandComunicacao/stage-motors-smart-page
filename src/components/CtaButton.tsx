"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaButtonProps {
  onClick: () => void;
  className?: string;
}

export function CtaButton({ onClick, className = "" }: CtaButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`group/cta h-14 cursor-pointer rounded-lg bg-zinc-300 px-8 text-base font-semibold tracking-wide text-zinc-900 transition-all duration-300 hover:bg-zinc-200 cta-glow ${className}`}
      size="lg"
    >
      QUERO VENDER MEU VEÍCULO
      <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
    </Button>
  );
}
