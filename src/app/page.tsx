"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyStageSection } from "@/components/sections/WhyStageSection";
import { UrgencySection } from "@/components/sections/UrgencySection";
import { VehicleForm } from "@/components/forms/VehicleForm";
import { StageLogo } from "@/components/StageLogo";

const Hyperspeed = dynamic(() => import('@/components/Hyperspeed'), { ssr: false });

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);

  return (
    <>
      {/* Background Hyperspeed effect */}
      <div className="fixed inset-0 z-[-30] opacity-[0.08] pointer-events-none">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 9,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 50,
            lightPairsPerRoadWay: 50,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [30, 40],
            movingCloserSpeed: [-60, -80],
            carLightsLength: [400 * 0.05, 400 * 0.15],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.2, 0.2],
            carFloorSeparation: [0.05, 1],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0x131318,
              brokenLines: 0x131318,
              leftCars: [0xffffff, 0xff6666, 0xff102a],
              rightCars: [0xff102a, 0xcc0011, 0xffffff],
              sticks: 0xffffff
            }
          }}
        />
      </div>

      <main className="flex-1 overflow-hidden">
        {/* Section 1 — Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroSection onCtaClick={openForm} />
        </motion.div>

        {/* Divider */}
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Section 2 — How it works */}
        <FadeIn>
          <HowItWorksSection onCtaClick={openForm} />
        </FadeIn>

        {/* Divider */}
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Section 3 — Why Stage Motors */}
        <FadeIn>
          <WhyStageSection onCtaClick={openForm} />
        </FadeIn>

        {/* Divider */}
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Section 4 — Urgency + Social Proof */}
        <FadeIn>
          <UrgencySection onCtaClick={openForm} />
        </FadeIn>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center"
        >
          <StageLogo className="h-8" />
          <p className="text-sm text-muted-foreground">
            Stage Motors — Fortaleza/CE
          </p>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Stage Motors. Todos os direitos
            reservados.
          </p>
        </motion.div>
      </footer>

      {/* Vehicle Form Modal */}
      <VehicleForm open={formOpen} onOpenChange={setFormOpen} />
    </>
  );
}
