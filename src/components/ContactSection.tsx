import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Honeypot check — if bot filled the hidden field, silently succeed
    if (honeypot) {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xldonobr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus(null), 3000);
  };

  const statusMessage =
    status === 'sending'
      ? 'Sending…'
      : status === 'success'
        ? '✓ Message sent successfully'
        : status === 'error'
          ? '✗ Failed to send — please try again'
          : '';

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-16 md:py-24" aria-label="Contact">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-2xl border border-white/10 bg-surface p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-biomed-red">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                Open to internships, collaborations, and engineering conversations.
              </h2>
              <p className="mt-5 text-lg leading-8 text-text-secondary">
                Applied AI, computer vision, full-stack development, and technical interface work.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                {
                  icon: <Mail size={18} aria-hidden="true" />,
                  label: portfolioData.socials.email,
                  href: `mailto:${portfolioData.socials.email}`,
                  ariaLabel: `Email ${portfolioData.socials.email}`,
                },
                {
                  icon: <Github size={18} aria-hidden="true" />,
                  label: 'github.com/xmananrastogi',
                  href: portfolioData.socials.github,
                  ariaLabel: 'GitHub profile (opens in new tab)',
                },
                {
                  icon: <Linkedin size={18} aria-hidden="true" />,
                  label: 'linkedin.com/in/manan-rastogi',
                  href: portfolioData.socials.linkedin,
                  ariaLabel: 'LinkedIn profile (opens in new tab)',
                },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-text-secondary transition hover:border-white/20 hover:bg-white/[0.06] hover:text-text-primary"
                  aria-label={item.ariaLabel}
                >
                  <span className="text-signal-cyan">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-background/60 p-5 md:p-6"
            aria-label="Contact form"
          >
            <div className="grid gap-5">
              {/* Honeypot field — hidden from humans, catches bots */}
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label>
                  <span>Leave this empty</span>
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-text-primary">Name</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-signal-cyan/40"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-text-primary">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-signal-cyan/40"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-text-primary">Message</span>
                <textarea
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  placeholder="Tell me the role, problem, dataset, or system you want to discuss."
                  className="resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-muted focus:border-signal-cyan/40"
                />
              </label>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-5 py-3 text-sm font-semibold text-background transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending' : 'Send message'}
                <Send size={16} aria-hidden="true" />
              </button>

              {/* ARIA live region for form status */}
              <div
                role="status"
                aria-live="polite"
                className={`text-center text-sm font-medium transition-opacity ${
                  status ? 'opacity-100' : 'opacity-0'
                } ${
                  status === 'success'
                    ? 'text-cv-green'
                    : status === 'error'
                      ? 'text-biomed-red'
                      : 'text-text-secondary'
                }`}
              >
                {statusMessage}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
