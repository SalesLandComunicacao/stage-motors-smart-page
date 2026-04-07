"use client";

import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyStageSection } from "@/components/sections/WhyStageSection";
import { UrgencySection } from "@/components/sections/UrgencySection";
import { VehicleForm } from "@/components/forms/VehicleForm";
import { StageLogo } from "@/components/StageLogo";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);

  return (
    <>
      <main className="flex-1">
        {/* Section 1 — Hero */}
        <HeroSection onCtaClick={openForm} />

        {/* Divider */}
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Section 2 — How it works */}
        <HowItWorksSection onCtaClick={openForm} />

        {/* Divider */}
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Section 3 — Why Stage Motors */}
        <WhyStageSection onCtaClick={openForm} />

        {/* Divider */}
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Section 4 — Urgency + Social Proof */}
        <UrgencySection onCtaClick={openForm} />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <StageLogo className="h-8" />
          <p className="text-sm text-muted-foreground">
            Stage Motors — Fortaleza/CE
          </p>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Stage Motors. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>

      {/* Vehicle Form Modal */}
      <VehicleForm open={formOpen} onOpenChange={setFormOpen} />
    </>
  );
}
