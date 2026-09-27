import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { smoothScrollTo } from '../utils/scrollTo';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 450);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sounds.playClick();
    smoothScrollTo(0);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="back-to-top-btn"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[90] group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0F0E0C]/90 text-cream border border-white/15 backdrop-blur-md shadow-2xl hover:bg-surface hover:border-accent hover:shadow-accent/20 transition-all cursor-pointer min-h-[44px] active:scale-95"
        >
          <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-warm group-hover:text-cream transition-colors pr-1">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
