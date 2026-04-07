import { TrendingDown, Clock, CheckCircle } from "lucide-react";

interface UrgencySectionProps {
  onCtaClick: () => void;
}

export function UrgencySection({ onCtaClick }: UrgencySectionProps) {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stage-red/[0.04] to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-stage-red/10">
          <TrendingDown className="size-8 text-stage-red" />
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl tracking-wider text-white sm:text-5xl md:text-6xl">
          NÃO DEIXE SEU CARRO
          <br />
          <span className="text-stage-red">DESVALORIZAR</span>
        </h2>

        {/* Copy */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A cada mês parado, seu veículo perde valor. Preencha o formulário
          agora e receba uma avaliação gratuita{" "}
          <span className="font-semibold text-white">em até 2 horas</span>.
        </p>

        {/* Social proof stats */}
        <div className="mx-auto mt-12 grid max-w-lg gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-card px-6 py-5">
            <p className="font-display text-3xl text-stage-red">500+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Veículos negociados
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-card px-6 py-5">
            <p className="font-display text-3xl text-white">2h</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tempo de resposta
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-card px-6 py-5">
            <p className="font-display text-3xl text-white">98%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Clientes satisfeitos
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-card p-6 text-left">
            <div className="flex gap-1 text-stage-red">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="size-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              &ldquo;Processo rápido e transparente. Recebi uma proposta justa e
              o pagamento foi feito no mesmo dia.&rdquo;
            </p>
            <p className="mt-3 text-sm font-medium text-white">
              Carlos M. — Fortaleza/CE
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-card p-6 text-left">
            <div className="flex gap-1 text-stage-red">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="size-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              &ldquo;Achei que seria complicado, mas foi tudo resolvido pelo
              WhatsApp. Equipe muito profissional.&rdquo;
            </p>
            <p className="mt-3 text-sm font-medium text-white">
              Ana P. — Fortaleza/CE
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-stage-red" />
            <span>Referência Tabela FIPE</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-stage-red" />
            <span>Sem compromisso</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-stage-red" />
            <span>100% seguro</span>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12">
          <button
            onClick={onCtaClick}
            className="group/cta inline-flex h-16 cursor-pointer items-center gap-3 rounded-lg bg-zinc-300 px-10 text-lg font-semibold tracking-wide text-zinc-900 transition-all duration-300 hover:bg-zinc-200 cta-glow"
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
          <p className="mt-4 text-sm text-muted-foreground">
            Avaliação gratuita. Sem compromisso.
          </p>
        </div>
      </div>
    </section>
  );
}
