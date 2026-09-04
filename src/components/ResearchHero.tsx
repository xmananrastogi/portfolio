import { ArrowDownRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { RetroGrid } from './ui/RetroGrid';
import { ShimmerButton } from './ui/ShimmerButton';
import { BlurFade } from './ui/BlurFade';

import { ParticleAvatar } from './ui/ParticleAvatar';

const ResearchHero = () => (
  <section
    id="hero"
    className="relative flex min-h-[90vh] flex-col justify-center px-5 pb-16 pt-28 md:px-10 overflow-hidden"
    aria-label="Hero section"
  >
    <RetroGrid />
    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-20">
        
        {/* Left Column: Text */}
        <div className="space-y-6">
          {/* Name — Magic UI / Aceternity style */}
          <BlurFade delay={0.25} inView>
            <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-tighter">
              <span className="text-zinc-50">Manan</span>
              <br />
              <span className="text-zinc-500">Rastogi</span>
            </h1>
          </BlurFade>

          {/* Descriptor */}
          <BlurFade delay={0.25 * 2} inView>
            <p className="max-w-xl text-[1rem] leading-[1.6] text-zinc-400">
              {portfolioData.positioning}
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.25 * 3} inView>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a id="cta-work" href="#projects">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base flex items-center gap-2">
                    See my work
                    <ArrowDownRight size={16} aria-hidden="true" />
                  </span>
                </ShimmerButton>
              </a>
              <a
                id="cta-resume"
                href={portfolioData.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="View resume (opens in new tab)"
              >
                <FileText size={16} aria-hidden="true" />
                Resume
              </a>
            </div>
          </BlurFade>

          {/* Socials */}
          <BlurFade delay={0.25 * 4} inView>
            <div className="flex items-center gap-5 pt-8">
              {[
                { href: portfolioData.socials.github, icon: <Github size={18} />, label: 'GitHub' },
                { href: portfolioData.socials.linkedin, icon: <Linkedin size={18} />, label: 'LinkedIn' },
                { href: `mailto:${portfolioData.socials.email}`, icon: <Mail size={18} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="text-zinc-500 transition-colors hover:text-zinc-50"
                >
                  {icon}
                </a>
              ))}
            </div>
          </BlurFade>
        </div>

        {/* Right Column: Holographic Particle Avatar */}
        <BlurFade delay={0.25 * 5} inView className="flex items-center justify-center h-[300px] sm:h-[400px] lg:h-[500px]">
          <ParticleAvatar imageSrc={`${import.meta.env.BASE_URL}assets/images/image.png`} />
        </BlurFade>

      </div>
    </div>
  </section>
);

export default ResearchHero;