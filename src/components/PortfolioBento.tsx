import { BrainCircuit, Code2, Cpu, GraduationCap, LineChart, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const snapshotCards = [
  {
    title: 'Applied AI',
    copy: 'LLM APIs, prompt evaluation, rule-based validation, and Python-first technical workflows.',
    icon: BrainCircuit,
  },
  {
    title: 'Frontend',
    copy: 'React, TypeScript, Tailwind, motion-driven UI, and polished project presentation.',
    icon: Code2,
  },
  {
    title: 'Systems base',
    copy: 'ECE, DSP, embedded systems foundations, backend tooling, and deployment awareness.',
    icon: Cpu,
  },
];

const PortfolioBento = () => {
  // Use metrics from the single source of truth
  const woundTrack = portfolioData.systems.find((s) => s.id === 'woundtrack-ai');
  const displayMetrics = woundTrack
    ? [
        { value: woundTrack.metrics[0].value, label: woundTrack.metrics[0].label },
        { value: woundTrack.metrics[2].value, label: woundTrack.metrics[2].label },
        { value: woundTrack.metrics[3].value, label: woundTrack.metrics[3].label },
        { value: woundTrack.metrics[4].value, label: woundTrack.metrics[4].label },
      ]
    : [];

  return (
    <section className="relative px-4 pb-16 md:pb-24" aria-label="Overview">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-surface-raised p-5 lg:col-span-2 lg:row-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-research-amber">
                At a glance
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-text-primary md:text-5xl">
                Applied AI, computer vision, and frontend engineering.
              </h2>
            </div>
            <Sparkles className="hidden size-10 text-research-amber md:block" aria-hidden="true" />
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3" role="list" aria-label="Credentials">
            {['VIT ECE', 'IITM Data Science', 'Deployed projects'].map((item) => (
              <div
                key={item}
                role="listitem"
                className="rounded-2xl border border-white/10 bg-background/70 p-4 text-sm font-medium text-text-secondary"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-background/70 p-4">
            <div className="flex items-center gap-3 text-sm font-semibold text-text-primary">
              <LineChart className="size-4 text-cv-green" aria-hidden="true" />
              WoundTrack project evidence
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {displayMetrics.map(({ value, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="font-mono text-2xl font-semibold text-text-primary">{value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {snapshotCards.map(({ title, copy, icon: Icon }) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-surface p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-signal-cyan">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-text-primary">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-text-secondary">{copy}</p>
          </div>
        ))}

        <div className="rounded-3xl border border-white/10 bg-surface p-5 lg:col-span-2">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-5 text-research-amber" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-text-primary">Education</h3>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-text-secondary">
            B.Tech in Electronics and Communication Engineering with Biomedical specialization at VIT,
            alongside the IIT Madras BS in Data Science and Applications. The work sits between software,
            AI evaluation, applied vision, and product presentation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioBento;
