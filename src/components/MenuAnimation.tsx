import { ArrowRight } from 'lucide-react';

interface MenuAnimationProps {
  items: Array<{ label: string; href: string }>;
  onSelect?: () => void;
}

const MenuAnimation = ({ items, onSelect }: MenuAnimationProps) => {
  return (
    <div className="flex min-w-fit flex-col gap-2 overflow-hidden">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onSelect}
          className="group/menu flex items-center gap-3 rounded-2xl px-1 py-1 transition hover:bg-white/[0.03]"
        >
          <ArrowRight className="size-5 -translate-x-full text-text-primary opacity-0 transition duration-300 ease-out group-hover/menu:translate-x-0 group-hover/menu:text-signal-cyan group-hover/menu:opacity-100 md:size-7" />
          <span className="z-10 -translate-x-6 text-2xl font-semibold tracking-tight text-text-primary transition-transform duration-300 ease-out group-hover/menu:translate-x-0 group-hover/menu:text-signal-cyan md:-translate-x-10 md:text-4xl">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default MenuAnimation;
