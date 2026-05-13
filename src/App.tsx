import { lazy, Suspense } from 'react';
import IntroScreen from './components/IntroScreen';
import ResearchHero from './components/ResearchHero';
import PortfolioBento from './components/PortfolioBento';
import AboutSection from './components/AboutSection';
import SystemsSection from './components/SystemsSection';
import GitHubActivity from './components/GitHubActivity';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { motion } from 'framer-motion';

// Lazy-load 3D scene to avoid blocking initial render
const Scene3D = lazy(() => import('./components/Scene3D'));

function App() {
  return (
    <ErrorBoundary>
      <SmoothScroll>
        <Navbar />

        {/* 3D background — lazy loaded, hidden on reduced motion via CSS */}
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>

        <motion.main
          id="main-content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
          className="relative z-10 min-h-screen bg-transparent text-text-primary"
          role="main"
        >
          <IntroScreen />
          <ResearchHero />
          <PortfolioBento />
          <SystemsSection />
          <GitHubActivity />
          <AboutSection />
          <SkillsSection />
          <ContactSection />

          <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-muted">
            <p>© {new Date().getFullYear()} Manan Rastogi</p>
            <p className="mt-2">
              Applied AI, full-stack engineering, and computer vision.
            </p>
            <a
              href="#hero"
              className="mt-4 inline-block text-text-secondary transition hover:text-signal-cyan"
              aria-label="Back to top"
            >
              ↑ Back to top
            </a>
          </footer>
        </motion.main>
      </SmoothScroll>
    </ErrorBoundary>
  );
}

export default App;
