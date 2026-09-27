import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, FileText, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { smoothScrollTo } from '../utils/scrollTo';

interface HeaderProps {
  activeSection: string;
  onOpenAIModal: () => void;
  onOpenResumeModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onOpenAIModal,
  onOpenResumeModal
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    lockScroll('mobile-menu');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unlockScroll('mobile-menu');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Work', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#tech-stack', id: 'tech-stack' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sounds.playClick();
    setMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <>
      {/* Desktop Top Bar Contract: Brand | 4-5 Text Nav Links | 1-2 Actions */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0C]/90 border-b border-white/10 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              sounds.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 cursor-pointer select-none text-cream"
            aria-label="Maniraj Kyatham Home"
          >
            <span className="font-display font-black text-lg tracking-tight uppercase group-hover:text-accent transition-colors">
              Maniraj Kyatham
            </span>
          </a>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-widest font-mono text-[#9E988F]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors py-1 relative hover:text-cream ${
                    isActive ? 'text-cream font-bold' : ''
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sounds.playModalOpen();
                onOpenAIModal();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface border border-white/15 text-cream text-xs font-mono font-medium hover:border-accent hover:text-white transition-colors cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Ask AI</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-light transition-colors active:scale-95 cursor-pointer shadow-sm"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                sounds.playModalOpen();
                onOpenAIModal();
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface border border-white/15 text-xs font-mono text-cream"
              aria-label="Ask AI Assistant"
            >
              <Sparkles className="w-3 h-3 text-accent" />
              <span>AI</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setMenuOpen(!menuOpen);
              }}
              className="w-10 h-10 rounded-full bg-surface border border-white/15 flex items-center justify-center text-cream cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <div className="w-4 h-3 flex flex-col justify-between pointer-events-none">
                <span
                  className={`h-[1.5px] bg-cream rounded-full transition-transform ${
                    menuOpen ? 'rotate-45 translate-y-[5.5px]' : ''
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-cream rounded-full transition-opacity ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-cream rounded-full transition-transform ${
                    menuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Fullscreen Drawer Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9980] bg-[#0A0A0C] text-[#E8E4DE] flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto overscroll-contain touch-pan-y"
          >
            {/* Top drawer bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="font-display font-bold text-base tracking-tight uppercase">
                Maniraj Kyatham
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-cream"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Nav list with reduced font sizes for mobile (text-base) and tablet (sm:text-lg md:text-xl) */}
            <div className="py-6 sm:py-8 space-y-2.5 sm:space-y-3.5 my-auto">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`group flex items-baseline gap-3 sm:gap-4 py-2 text-base sm:text-lg md:text-xl font-display font-bold uppercase transition-colors ${
                      isActive ? 'text-accent' : 'text-cream hover:text-accent'
                    }`}
                  >
                    <span className="font-mono text-[11px] sm:text-xs text-[#8A8275] group-hover:text-accent transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="tracking-tight">{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent ml-2 self-center shrink-0" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8A8275]">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cream"
                >
                  GitHub
                </a>
                <span>·</span>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cream"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <a
                  href={PERSONAL_INFO.x}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cream"
                >
                  X
                </a>
                <span>·</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-cream"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
