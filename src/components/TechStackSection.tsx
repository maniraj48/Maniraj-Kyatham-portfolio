import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { Code, Server, Layout, Database, Cpu, Terminal, Layers } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'LANGUAGES',
    'BACKEND',
    'FRONTEND',
    'DATABASES',
    'AI / ML',
    'TOOLS',
    'CONCEPTS'
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'LANGUAGES':
        return Code;
      case 'BACKEND':
        return Server;
      case 'FRONTEND':
        return Layout;
      case 'DATABASES':
        return Database;
      case 'AI / ML':
        return Cpu;
      case 'TOOLS':
        return Terminal;
      case 'CONCEPTS':
        return Layers;
      default:
        return Code;
    }
  };

  const filteredGroups =
    activeCategory === 'ALL'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.category === activeCategory);

  return (
    <section
      id="tech-stack"
      className="relative w-full bg-[#0A0A0C] text-[#E8E4DE] py-10 sm:py-12 md:py-16 overflow-hidden border-b border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some', margin: '0px 0px -40px 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
      >
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block mb-3">
            04 / STACK
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-cream tracking-tight uppercase">

{/*          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-cream tracking-tight uppercase">
*/}
            TECHNICAL SKILLS
          </h2>
          <div className="h-[2px] w-16 bg-accent mt-2.5 mb-4" />
          <p className="text-base sm:text-lg text-[#9E988F] font-sans max-w-2xl leading-relaxed">
            Categorized technical capabilities across software development, backend systems, database architecture, machine learning, and core computer science fundamentals.
          </p>
        </div>

        {/* Interactive Category Tabs */}
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[40px] active:scale-95 ${
                  isSelected
                    ? 'bg-accent text-white font-bold shadow-md'
                    : 'bg-[#141516] text-[#8A8275] hover:text-cream border border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group) => {
              const Icon = getCategoryIcon(group.category);

              return (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  // className="p-6 sm:p-7 rounded-2xl bg-[#141516] border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  className="p-6 sm:p-7 rounded-2xl bg-[#141516] border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between shadow-lg"

                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-cream font-bold">
                          {group.category}
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] text-[#8A8275]">
                        {group.skills.length} skills
                      </span>
                    </div>

                    {/* Skill Items List */}
                    <ul className="space-y-2.5">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center justify-between text-xs sm:text-sm text-[#E8E4DE]/90 font-sans hover:text-cream transition-colors py-1 px-2 rounded hover:bg-white/[0.04]"
                        >
                          <span className="font-medium">{skill}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8A8275]">
                    <span>Verified Core Focus</span>
                    <span className="text-accent">Practical Application</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
};
