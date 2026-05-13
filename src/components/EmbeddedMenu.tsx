import { FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import MenuAnimation from './MenuAnimation';

const menuItems = [
  { href: '#systems', label: 'Projects' },
  { href: '#stack', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const EmbeddedMenu = () => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-surface-raised/90 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Navigate
          </p>
        </div>
        <a
          href={portfolioData.resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-white/[0.08]"
        >
          <FileText size={16} />
          Resume
        </a>
      </div>

      <div className="pt-5">
        <MenuAnimation items={menuItems} />
      </div>
    </div>
  );
};

export default EmbeddedMenu;
