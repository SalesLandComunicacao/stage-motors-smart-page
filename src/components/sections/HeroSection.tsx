import { StageLogo } from "@/components/StageLogo";
import { Shield, Star, Clock } from "lucide-react";

interface HeroSectionProps {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 diagonal-lines" />
      <div className="pointer-events-none absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-12">
          <StageLogo className="h-16 sm:h-20" />
        </div>

        {/* Badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-muted-foreground backdrop-blur-sm">
          <Star className="size-4 text-stage-red" />
          <span>Mais de 500 veículos negociados</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl leading-none tracking-wider text-white sm:text-7xl md:text-8xl">
          TRANSFORME SEU CARRO
          <br />
          <span className="text-stage-red">EM DINHEIRO. HOJE.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A Stage Motors compra seu veículo com avaliação justa, processo rápido
          e pagamento na hora.{" "}
          <span className="text-white font-medium">Sem burocracia.</span>
        </p>

        {/* CTA */}
        <button
          onClick={onCtaClick}
          className="group/cta mt-10 flex h-16 cursor-pointer items-center gap-3 rounded-lg bg-stage-red px-10 text-lg font-semibold tracking-wide text-white transition-all duration-300 hover:bg-stage-red-hover cta-glow"
        >
          QUERO VENDER MEU VEÍCULO
          <svg
            className="size-5 transition-transform duration-300 group-hover/cta:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-stage-red" />
            <span>Avaliação gratuita</span>
          </div>
          <div className="hidden h-4 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-stage-red" />
            <span>Resposta em até 2 horas</span>
          </div>
          <div className="hidden h-4 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2">
            <Star className="size-4 text-stage-red" />
            <span>Referência Tabela FIPE</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1">
          <div className="h-2 w-full rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
