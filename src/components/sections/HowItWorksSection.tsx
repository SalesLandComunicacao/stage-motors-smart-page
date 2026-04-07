import { ClipboardList, Search, Banknote } from "lucide-react";

interface HowItWorksSectionProps {
  onCtaClick: () => void;
}

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Preencha os dados",
    description:
      "Informe modelo, ano e quilometragem do seu veículo. Leva menos de 2 minutos.",
  },
  {
    icon: Search,
    number: "02",
    title: "Receba a avaliação",
    description:
      "Nossa equipe analisa as informações e envia uma proposta justa baseada na Tabela FIPE.",
  },
  {
    icon: Banknote,
    number: "03",
    title: "Receba seu pagamento",
    description:
      "Acordo fechado? Pagamento rápido e seguro. Cuidamos de toda a documentação.",
  },
];

export function HowItWorksSection({ onCtaClick }: HowItWorksSectionProps) {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-stage-red">
            Processo simples
          </span>
          <h2 className="font-display text-4xl tracking-wider text-white sm:text-5xl md:text-6xl">
            VENDER SEU CARRO NUNCA
            <br />
            FOI TÃO SIMPLES
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-xl border border-white/5 bg-card p-8 transition-all duration-300 hover:border-stage-red/20 hover:bg-white/[0.03]"
            >
              {/* Step number */}
              <span className="font-display text-5xl text-white/5 transition-colors duration-300 group-hover:text-stage-red/10">
                {step.number}
              </span>

              {/* Icon */}
              <div className="mt-4 flex size-12 items-center justify-center rounded-lg bg-stage-red/10 text-stage-red">
                <step.icon className="size-6" />
              </div>

              {/* Content */}
              <h3 className="mt-5 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connector line (desktop only) */}
        <div className="relative mt-4 hidden sm:block">
          <div className="absolute left-[16.67%] right-[16.67%] top-0 h-px bg-gradient-to-r from-transparent via-stage-red/20 to-transparent" />
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onCtaClick}
            className="group/cta inline-flex h-14 cursor-pointer items-center gap-3 rounded-lg bg-stage-red px-8 text-base font-semibold tracking-wide text-white transition-all duration-300 hover:bg-stage-red-hover cta-glow"
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
