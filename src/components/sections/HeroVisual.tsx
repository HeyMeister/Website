import { home } from "@/content/home";
import { CalendarIcon, CheckIcon } from "@/components/icons";
import { LogbookScreen, PlanScreen, ReportScreen } from "./LogbookMockup";

/**
 * Hero visual: three product screens on a navy stage (brandbook: no shadows, depth comes from
 * the stage and the layering). Back screens are decorative and hidden from assistive technology.
 *
 * Motion: the back screens float slowly; in the main screen one site switches from "due" to
 * "checked" and a toast confirms the report. All animation is motion-safe only.
 */
export function HeroVisual() {
  const data = home.logbookExample;
  return (
    <figure className="relative">
      <div className="relative rounded-[28px] bg-base px-4 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pt-8">
        <div aria-hidden="true" className="hm-dots pointer-events-none absolute inset-0 rounded-[28px]" />
        {/* Soft coral glow in a corner of the stage: colour, not shadow. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/25 blur-3xl"
        />

        <div className="relative sm:pt-24 xl:pt-28">
          {/* Back screens: peek out above the main screen. */}
          <div aria-hidden="true" className="absolute left-0 top-0 hidden w-[54%] -rotate-[5deg] sm:block">
            <div className="motion-safe:animate-hm-float-slow">
              <ReportScreen />
            </div>
          </div>
          <div aria-hidden="true" className="absolute right-0 top-3 hidden w-[44%] rotate-[4deg] sm:block">
            <div className="motion-safe:animate-hm-float">
              <PlanScreen />
            </div>
          </div>

          <div className="relative z-10">
            <LogbookScreen animated />
          </div>
        </div>

        {/* Appointment chip, top right of the main screen. */}
        <div
          aria-hidden="true"
          className="absolute -top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-line bg-surface-raised py-1.5 pl-2 pr-3.5 sm:right-8"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-light text-accent-dark">
            <CalendarIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <span className="text-[0.75rem] leading-4">
            <span className="font-semibold text-ink">{data.appointment.label}</span>
            <span className="text-ink-muted"> · {data.appointment.text}</span>
          </span>
        </div>

        {/* Toast: appears when the status switches. Hidden without motion, so the static state stays consistent. */}
        <div
          aria-hidden="true"
          className="absolute -bottom-5 left-4 z-20 flex items-center gap-3 rounded-card border border-line bg-surface-raised py-2.5 pl-2.5 pr-4 opacity-0 motion-safe:animate-hm-toast sm:left-8"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success text-white">
            <CheckIcon className="h-4 w-4" strokeWidth={3} />
          </span>
          <span className="text-small leading-5">
            <span className="block font-semibold text-ink">{data.animated.toast.title}</span>
            <span className="block font-mono text-[0.75rem] leading-4 text-ink-muted">{data.animated.toast.meta}</span>
          </span>
        </div>
      </div>
      <figcaption className="mt-8 text-small text-ink-muted">
        Beispielansicht des digitalen Betriebsbuchs. Namen und Daten sind erfunden.
      </figcaption>
    </figure>
  );
}
