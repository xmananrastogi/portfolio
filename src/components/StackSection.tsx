import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, GraduationCap, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './ui/SpotlightCard';
import { Marquee } from './ui/Marquee';

const StackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="px-5 py-24 md:px-10" aria-label="Skills and background">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-50">Stack & Background</h2>

        <div ref={ref} className="grid gap-4 lg:grid-cols-3">
          
          {/* Identity & About (Takes 1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0, type: "spring", bounce: 0 }}
            className="lg:col-span-1 h-full"
          >
            <SpotlightCard className="p-6 h-full flex flex-col">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">About</div>
              <p className="text-sm font-semibold leading-relaxed text-zinc-200">{portfolioData.about.role}</p>
              
              <div className="mt-6 space-y-4 flex-1">
                <div className="flex items-start gap-3 text-sm text-zinc-400">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-zinc-500" />
                  {portfolioData.about.location}
                </div>
                <div className="flex items-start gap-3 text-sm text-zinc-400">
                  <GraduationCap size={16} className="mt-0.5 shrink-0 text-zinc-500" />
                  <span className="leading-relaxed">{portfolioData.about.education}</span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Skills Marquee (Takes 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0 }}
            className="lg:col-span-2 h-full"
          >
            <SpotlightCard className="p-6 h-full flex flex-col justify-center overflow-hidden relative">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 z-10 relative">
                Skills
              </div>
              <div className="relative flex w-full flex-col items-center justify-center overflow-hidden h-full flex-1 gap-2 pt-2">
                {portfolioData.skillsCategories.map((cat, i) => (
                  <Marquee key={cat.title} pauseOnHover className="[--duration:30s] w-full" reverse={i % 2 === 1}>
                    {cat.items.map((item) => (
                       <span key={item} className="badge bg-zinc-900/50 backdrop-blur-sm border-zinc-800 text-zinc-300 font-medium whitespace-nowrap">{item}</span>
                    ))}
                  </Marquee>
                ))}
                {/* Left/Right Fades */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10"></div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Principles (Takes 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", bounce: 0 }}
            className="lg:col-span-2"
          >
            <SpotlightCard className="p-6 h-full">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Principles</div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {portfolioData.about.operatingPrinciples.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>

          {/* Certifications (Takes 1 column) */}
          <div className="lg:col-span-1 space-y-4">
            {portfolioData.certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, type: "spring", bounce: 0 }}
                className="h-full"
              >
                <SpotlightCard className="p-6 h-full flex flex-col justify-center">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                      <Award size={16} className="text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-snug text-zinc-200">{cert.title}</div>
                      <div className="mt-1.5 text-xs text-zinc-500">{cert.issuer} · {cert.date}</div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StackSection;