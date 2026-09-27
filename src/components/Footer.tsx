import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070709] border-t border-white/10 py-12 px-5 sm:px-8 md:px-12 lg:px-16 text-[#8A8275] font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Brand & Role */}
        <div className="space-y-1">
          <div className="font-display font-bold text-cream text-base tracking-tight uppercase">
            {PERSONAL_INFO.name}
          </div>
          <div className="text-[#9E988F]">
            {PERSONAL_INFO.role}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-5 text-cream/90">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={PERSONAL_INFO.x}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            X (Twitter)
          </a>
          <span>·</span>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="flex items-center gap-6">
          <span>© 2026 Maniraj Kyatham</span>
          
          {/*
          <button
            type="button"
            onClick={handleScrollToTop}
            className="w-9 h-9 rounded-full bg-surface border border-white/10 flex items-center justify-center text-cream hover:text-accent hover:border-accent transition-colors cursor-pointer active:scale-95"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          */}
        </div>

      </div>
    </footer>
  );
};
