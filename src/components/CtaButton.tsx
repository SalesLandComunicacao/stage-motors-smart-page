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
      className={`group/cta h-14 cursor-pointer rounded-lg bg-stage-red px-8 text-base font-semibold tracking-wide text-white transition-all duration-300 hover:bg-stage-red-hover cta-glow ${className}`}
      size="lg"
    >
      QUERO VENDER MEU VEÍCULO
      <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
    </Button>
  );
}
