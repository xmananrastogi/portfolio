import { Home, Briefcase, FolderOpen, Layers, Mail, FileText, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Dock, DockIcon } from './ui/Dock';

const dockItems = [
  { icon: Home,       href: '#hero',       label: 'Home' },
  { icon: Briefcase,  href: '#experience', label: 'Experience' },
  { icon: FolderOpen, href: '#projects',   label: 'Projects' },
  { icon: Layers,     href: '#stack',      label: 'Stack' },
  { icon: Mail,       href: '#contact',    label: 'Contact' },
];

const socialItems = [
  { icon: Github,   href: portfolioData.socials.github,   label: 'GitHub',   external: true },
  { icon: Linkedin, href: portfolioData.socials.linkedin, label: 'LinkedIn', external: true },
  { icon: FileText, href: portfolioData.resumeLink,       label: 'Resume',   external: true },
];

export default function Navbar() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2">
      <Dock magnification={60} distance={100}>
        {/* Section nav icons */}
        {dockItems.map((item) => (
          <DockIcon key={item.href}>
            <a
              href={item.href}
              aria-label={item.label}
              className="flex h-full w-full items-center justify-center rounded-full bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <item.icon className="size-[45%]" />
            </a>
          </DockIcon>
        ))}

        {/* Separator */}
        <div className="mx-1 h-8 w-px self-center bg-white/10" />

        {/* External links */}
        {socialItems.map((item) => (
          <DockIcon key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="flex h-full w-full items-center justify-center rounded-full bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <item.icon className="size-[45%]" />
            </a>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}