import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight, ExternalLink } from 'lucide-react';
import { ARTICLES, PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export const WritingSection: React.FC = () => {
  return (
    <section
      id="writing"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block mb-3">
              05 / WRITING
            </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-cream tracking-tight uppercase">
{/*
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-cream tracking-tight uppercase leading-[0.94]">
*/}
              THINGS I'VE<br />
              BEEN WRITING.
            </h2>
            <div className="h-[2px] w-16 sm:w-20 bg-accent mt-3 mb-4" />
            <p className="text-base sm:text-lg text-[#9E988F] font-sans max-w-2xl leading-relaxed">
              Technical notes and beginner-friendly explanations about web development, backend systems, APIs, and software fundamentals.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.medium}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 self-start md:self-end px-4 py-2.5 rounded-full border border-white/15 bg-[#141516] hover:border-accent text-cream hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 group active:scale-95 shrink-0"
          >
            <span>VIEW MEDIUM</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Large Editorial Articles List */}
        <div className="border-t border-white/10 divide-y divide-white/10 mb-12 sm:mb-16">
          {ARTICLES.map((article) => {
            return (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                onClick={() => sounds.playClick()}
                className="group block relative py-8 sm:py-10 md:py-12 px-3 sm:px-5 -mx-3 sm:-mx-5 rounded-xl transition-all duration-300 hover:bg-[#141516]/40 cursor-pointer"
              >
                {/* Active indicator bar on hover */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Left Column: Number & Date */}
                  <div className="lg:col-span-2 flex items-baseline lg:flex-col justify-between lg:justify-start gap-3 text-xs font-mono uppercase tracking-widest text-[#8A8275]">
                    <span className="text-base sm:text-lg font-bold text-[#8A8275] group-hover:text-accent transition-colors font-mono">
                      {article.articleNumber}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#8A8275] group-hover:text-[#B8B2A7] transition-colors">
                      {article.date}
                    </span>
                  </div>

                  {/* Middle Column: Title, Description, Tags & Read Details */}
                  <div className="lg:col-span-7 space-y-3.5">
                    {/* Large Title */}
                    <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-cream tracking-tight uppercase leading-snug group-hover:text-white transition-colors">
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                        {article.title}
                      </span>
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-[#9E988F] font-sans leading-relaxed group-hover:text-cream/80 transition-colors">
                      {article.shortDescription}
                    </p>

                    {/* Tags (Zero-Pill clean typography with dot separators) */}
                    <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono uppercase tracking-wider text-[#8A8275]">
                      {article.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          <span className="group-hover:text-[#B8B2A7] transition-colors">
                            {tag}
                          </span>
                          {idx < article.tags.length - 1 && (
                            <span className="text-white/20 select-none" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Reading Time & Read Action on Mobile/Tablet */}
                    <div className="pt-2 flex items-center justify-between lg:hidden text-xs font-mono uppercase tracking-widest text-[#8A8275] border-t border-white/5 mt-4">
                      <span>{article.readTime}</span>
                      <span className="inline-flex items-center gap-1.5 font-bold text-cream group-hover:text-accent transition-colors">
                        <span>READ</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Thumbnail Image & Desktop Read CTA */}
                  <div className="lg:col-span-3 flex flex-col gap-3.5">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-[#141516] shadow-md group-hover:border-accent/40 transition-colors">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Desktop Reading time & Read link */}
                    <div className="hidden lg:flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8A8275] pt-1">
                      <span>{article.readTime}</span>
                      <span className="inline-flex items-center gap-1 font-bold text-cream group-hover:text-accent transition-colors">
                        <span>READ</span>
                        <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Medium Profile CTA Panel */}
        <div className="relative rounded-2xl bg-[#141516] border border-white/10 p-6 sm:p-8 md:p-10 overflow-hidden group hover:border-accent/40 transition-colors">
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none group-hover:bg-accent/15 transition-colors"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent block font-semibold">
                READ MORE ON MEDIUM
              </span>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream italic font-normal tracking-tight">
                "Breaking things down. Building things up."
              </p>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8A8275] block pt-1">
                {PERSONAL_INFO.name}
              </span>
            </div>

            <a
              href={PERSONAL_INFO.medium}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-light transition-all active:scale-95 shadow-sm group shrink-0 self-start md:self-center"
            >
              <span>VIEW MEDIUM</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
