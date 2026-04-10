import Image from "next/image";
import { Shield, Star, Clock } from "lucide-react";
import bannerImg from "@/components/banner_65a5997e21d08.png";

interface HeroSectionProps {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden w-full pb-20">
      {/* Background effects for the entire section */}
      <div className="pointer-events-none absolute inset-0 diagonal-lines -z-20" />
      <div className="pointer-events-none absolute inset-0 hero-gradient -z-20 opacity-70" />

      {/* Top Banner edge-to-edge - zoomed 25% to increase logo size */}
      <div className="relative w-full flex justify-center overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] brightness-110 z-10 bg-black">
        <div className="w-[125%] min-w-[125%] shrink-0">
          <Image 
            src={bannerImg} 
            alt="Stage Motors Hero Banner" 
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        {/* Gradual fade reduced in height */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      </div>

      {/* Content pulled up directly underneath the logo inside the banner */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center px-4 -mt-8 sm:-mt-16 md:-mt-24">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300 backdrop-blur-sm">
          <Star className="size-4 text-stage-red" />
          <span>Mais de 500 veículos negociados</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl leading-tight tracking-wider text-white drop-shadow-lg">
          TRANSFORME SEU CARRO
          <br />
          <span className="text-stage-red">EM DINHEIRO. HOJE.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          A Stage Motors compra seu veículo com avaliação justa, processo rápido
          e pagamento na hora.{" "}
          <span className="text-white font-medium">Sem burocracia.</span>
        </p>

        {/* CTA */}
        <button
          onClick={onCtaClick}
          className="group/cta mt-10 flex h-16 cursor-pointer items-center gap-3 rounded-lg bg-zinc-200 px-10 text-lg font-semibold tracking-wide text-zinc-900 transition-all duration-300 hover:bg-white cta-glow shadow-xl"
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
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-zinc-500">
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
            <span>Avaliação Justa e Segura</span>
          </div>
        </div>
      </div>

    </section>
  );
}
