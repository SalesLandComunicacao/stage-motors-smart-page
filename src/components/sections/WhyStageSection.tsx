import { Scale, Zap, FileCheck, Headphones } from "lucide-react";

interface WhyStageSectionProps {
  onCtaClick: () => void;
}

const differentials = [
  {
    icon: Scale,
    title: "Avaliação Transparente",
    description:
      "Avaliamos seu veículo de forma realista e responsável. Seu carro recebe uma proposta justa, sem desvalorizações agressivas absurdas que o mercado aplica.",
  },
  {
    icon: Zap,
    title: "Pagamento Rápido",
    description:
      "Acordo fechado, pagamento na hora. Sem enrolação, sem promessa vazia.",
  },
  {
    icon: FileCheck,
    title: "Zero Burocracia",
    description:
      "Cuidamos de toda a documentação e transferência. Você só precisa assinar.",
  },
  {
    icon: Headphones,
    title: "Atendimento Premium",
    description:
      "Equipe especializada pronta para te atender pelo WhatsApp a qualquer momento.",
  },
];

export function WhyStageSection({ onCtaClick }: WhyStageSectionProps) {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-stage-red/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-stage-red">
            Diferenciais
          </span>
          <h2 className="font-display text-4xl tracking-wider text-white sm:text-5xl md:text-6xl">
            SEU CARRO MERECE UMA
            <br />
            NEGOCIAÇÃO À ALTURA
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {differentials.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-card/75 backdrop-blur-md p-8 transition-all duration-300 hover:border-stage-red/20"
            >
              {/* Decorative corner */}
              <div className="absolute -right-8 -top-8 size-24 rounded-full bg-stage-red/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-stage-red/8" />

              <div className="relative">
                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-lg bg-stage-red/10 text-stage-red">
                  <item.icon className="size-6" />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onCtaClick}
            className="group/cta inline-flex h-14 cursor-pointer items-center gap-3 rounded-lg bg-zinc-300 px-8 text-base font-semibold tracking-wide text-zinc-900 transition-all duration-300 hover:bg-zinc-200 cta-glow"
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
        </div>
      </div>
    </section>
  );
}
