import React from 'react';
import { motion } from 'motion/react';

export const MarqueeStrip: React.FC = () => {
  const items = [
    'PYTHON',
    'FASTAPI REST APIS',
    'SQL QUERY OPTIMIZATION (<40MS)',
    'FLASK',
    'SCIKIT-LEARN',
    'LANGCHAIN & CHROMADB',
    'SQLITE & POSTGRESQL',
    'OFFLINE DOCUMENT INTELLIGENCE',
    'JWT AUTHENTICATION',
    'B.TECH IT (CGPA 8.36)',
    'ACE ENGINEERING COLLEGE',
    'OBJECT-ORIENTED PROGRAMMING'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full relative z-20 overflow-hidden select-none border-t border-b border-white/10 bg-[#0E0F10] py-3.5"
    >
      <div className="flex w-max marquee-content-left">
        {[...items, ...items, ...items].map((tech, i) => (
          <div key={i} className="inline-flex items-center gap-6 pr-6">
            <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.2em] text-[#B8B2A7] font-medium whitespace-nowrap">
              {tech}
            </span>
            <span className="text-accent text-[11px]" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
