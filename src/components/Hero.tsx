import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { smoothScrollTo } from '../utils/scrollTo';
import { Github, Linkedin, ArrowUpRight, MapPin, Terminal, Cpu } from 'lucide-react';
import { XIcon } from './icons/XIcon';

interface HeroProps {
  onShowToast?: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const handleScrollTo = (id: string) => {
    sounds.playClick();
    smoothScrollTo('#' + id);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[90vh] pt-24 pb-12 md:pt-28 md:pb-14 px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-center overflow-hidden bg-[#0A0A0C]"
    >
      {/* Subtle Background Structural Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #E8E4DE 1px, transparent 1px), linear-gradient(to bottom, #E8E4DE 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Main Typography & Identity Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8">
            
            {/* Small Technical Status Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(196,93,62,0.8)]" />
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent font-semibold">
                FINAL-YEAR B.TECH • INFORMATION TECHNOLOGY
              </span>
            </motion.div>

            {/* Oversized MANIRAJ KYATHAM Identity Typography */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >

              <h1 className="select-none leading-[0.88] tracking-tight uppercase">
                {/* <span className="block font-display font-black text-cream text-[clamp(2.8rem,9.5vw,7.8rem)] tracking-[-0.03em]">
                */}
                <span className="block font-display font-black text-cream text-[clamp(2rem,7vw,5.5rem)] tracking-[-0.03em] leading-none mb-2">

                  Maniraj
                </span>
            

                <span className="serif-accent block text-cream text-[clamp(2rem,8vw,7rem)] font-normal normal-case text-[#E8E4DE]/90">

{/*                <span className="serif-accent block text-cream text-[clamp(2.6rem,8.8vw,7.2rem)] font-normal normal-case -mt-1 md:-mt-3 text-[#E8E4DE]/90">
*/}
                  Kyatham
                </span>
              </h1>
            </motion.div>

            {/* Primary Positioning & Alternative Supporting Line from Prompt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 max-w-2xl"
            >
              <p className="text-base sm:text-xl text-cream/90 font-sans leading-relaxed">
                Software Developer building backend systems, APIs and AI-powered applications.
              </p>
              <p className="font-mono text-xs sm:text-sm text-[#9E988F] tracking-wide">
                Python • Backend • REST APIs • Machine Learning
              </p>
            </motion.div>

            {/* Location & Context Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[#8A8275]"
            >
              <span className="flex items-center gap-1.5 text-cream/80">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Hyderabad, India</span>
              </span>
              <span>·</span>
              <span>ACE Engineering College (CGPA 8.36)</span>
            </motion.div>

            {/* Action Buttons & Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA: VIEW WORK */}
              <button
                type="button"
                onClick={() => handleScrollTo('projects')}
                className="px-7 py-3.5 rounded-full bg-accent text-white hover:bg-accent-light font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                <span>VIEW WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA: CONTACT */}
              <button
                type="button"
                onClick={() => handleScrollTo('contact')}
                className="px-7 py-3.5 rounded-full bg-transparent border border-white/20 text-cream hover:text-white hover:border-cream font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer"
              >
                CONTACT
              </button>

              {/* Additional Links: GitHub, LinkedIn & X */}
              <div className="flex items-center gap-3 ms-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-surface border border-white/10 flex items-center justify-center text-[#9E988F] hover:text-cream hover:border-white/30 transition-colors"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-surface border border-white/10 flex items-center justify-center text-[#9E988F] hover:text-cream hover:border-white/30 transition-colors"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.x}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-surface border border-white/10 flex items-center justify-center text-[#9E988F] hover:text-cream hover:border-white/30 transition-colors"
                  title="X (Twitter) Profile"
                  aria-label="X (Twitter) Profile"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Asymmetric Editorial Portrait Composition Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md group">
              
              
              {/* Rotating Stamp Disc Badge (Aitezaz signature interaction) */}
              {/*
              <div className="absolute -top-7 -right-7 sm:-top-8 sm:-right-8 z-30 pointer-events-none select-none">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full stamp-disc text-[#8A8275] fill-current"
                  >
                    <path
                      id="stampCirclePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="font-mono text-[9px] uppercase tracking-[0.24em] fill-current">
                      <textPath href="#stampCirclePath" startOffset="0%">
                        • MANIRAJ KYATHAM • SOFTWARE DEVELOPER • HYDERABAD •
                      </textPath>
                    </text>
                  </svg>
                  <span className="absolute w-2 h-2 rounded-full bg-accent" />
                </div>
              </div>
              */}

              {/* Sophisticated Editorial Technical Frame with Corner Crosshairs */}
              <div className="relative rounded-2xl overflow-hidden bg-[#141516] border border-white/15 p-2.5 sm:p-3 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                
                {/* Technical Frame Corner Crosshairs */}
                <div className="absolute top-1 left-1 text-[#8A8275]/40 font-mono text-[10px] leading-none pointer-events-none select-none">+</div>
                <div className="absolute top-1 right-1 text-[#8A8275]/40 font-mono text-[10px] leading-none pointer-events-none select-none">+</div>
                <div className="absolute bottom-1 left-1 text-[#8A8275]/40 font-mono text-[10px] leading-none pointer-events-none select-none">+</div>
                <div className="absolute bottom-1 right-1 text-[#8A8275]/40 font-mono text-[10px] leading-none pointer-events-none select-none">+</div>

                {/* Header Metadata Ribbon */}
                <div className="px-2 py-1.5 mb-2 flex items-center justify-between text-[11px] font-mono text-[#8A8275] border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-cream uppercase tracking-wider font-semibold">MANIRAJ KYATHAM</span>
                  </div>
                  <span>HYDERABAD</span>
                </div>

                {/* Natural Headshot Photo */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/40">
                  <img
                    src="/maniraj-portrait.jpg"
                    alt="Maniraj Kyatham — Software Developer"
                    referrerPolicy="no-referrer"
                    
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient Scrim at base for label readability */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  {/* Base Metadata Tag inside image */}
                  {/*
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-cream">
                    <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                      B.Tech IT · 2027
                    </span>
                    <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-accent font-bold">
                      &lt;40ms SQL
                    </span>
                  </div>
                  */}
                </div>

                {/* Bottom Technical Coordinates Strip */}
                {/*
                <div className="mt-2 px-2 py-1.5 flex items-center justify-between text-[10px] font-mono text-[#8A8275]">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-accent" />
                    <span>Python · FastAPI · ML</span>
                  </span>
                  <span>17.3850° N, 78.4867° E</span>
                </div>
                */}

              </div>

              {/* Minimal floating accent badge */}
              {/*
              <div className="hidden sm:flex absolute -bottom-3 -left-3 items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0F0E0C] border border-white/20 shadow-xl font-mono text-xs text-cream z-20">
                <Cpu className="w-3.5 h-3.5 text-accent" />
                <span>Backend &amp; Offline Systems</span>
              </div>

              */}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
