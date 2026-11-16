import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { SCENE_ASSETS, SITE_CONTENT } from '../data/siteContent';
import { useUniverseState } from '../hooks/useUniverseState';

const FOOTSTEPS = [
  { x: '34%', y: '78%', rotate: -14, delay: 0.1 },
  { x: '39%', y: '74%', rotate: -8, delay: 0.35 },
  { x: '43%', y: '71%', rotate: -12, delay: 0.6 },
  { x: '48%', y: '67%', rotate: -6, delay: 0.85 },
  { x: '53%', y: '64%', rotate: -10, delay: 1.1 },
];

export const Chapter01Beach: React.FC = () => {
  const { startJourney, navigateToSection, discoverTreasure, discoveredTreasures, reducedMotion } =
    useUniverseState();
  const [walking, setWalking] = useState(false);

  const shellFound = discoveredTreasures.includes('treasure-1');

  const handleBegin = () => {
    setWalking(true);
    if (reducedMotion) {
      startJourney();
      return;
    }
    window.setTimeout(() => {
      startJourney();
    }, 950);
  };

  return (
    <section
      id="chapter-beach"
      className="relative min-h-screen w-full overflow-hidden bg-[#102D3A] text-[#F8F3E9] flex flex-col justify-between pt-20 pb-14 px-6 sm:px-12"
    >
      {/* Golden hour beach backdrop with subtle atmospheric parallax */}
      <motion.div
        initial={reducedMotion ? false : { scale: 1.06 }}
        animate={reducedMotion ? undefined : { scale: walking ? 1.11 : 1.02 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img
          src={SCENE_ASSETS.beachGoldenHour}
          alt="Quiet beach at golden hour with gentle waves and seashells"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Subtle drifting cloud haze & measured contrast scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#091521]/55 via-[#102D3A]/20 to-transparent animate-cloud-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091521]/85 via-[#091521]/30 to-[#091521]/45"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 film-grain opacity-40" />

      {/* Continuous subtle shoreline wave highlight */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-16 left-0 w-[108%] h-16 opacity-35 animate-wave-slow"
      >
        <path
          d="M0 64 Q 180 28 360 64 T 720 64 T 1080 64 T 1440 64"
          fill="none"
          stroke="#F8F3E9"
          strokeWidth="1.5"
        />
        <path
          d="M0 84 Q 240 50 480 84 T 960 84 T 1440 84"
          fill="none"
          stroke="#E8D6B8"
          strokeWidth="1"
          opacity="0.7"
        />
      </svg>

      {/* Sequential footsteps on the wet sand */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        {FOOTSTEPS.map((step, idx) => (
          <motion.svg
            key={idx}
            width="18"
            height="32"
            viewBox="0 0 18 32"
            style={{ left: step.x, top: step.y, rotate: `${step.rotate}deg` }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: walking ? 0.65 : 0.28, y: 0 }}
            transition={{ delay: walking ? step.delay * 0.45 : 1.1 + step.delay, duration: 0.7 }}
            className="absolute text-[#091521]"
          >
            <ellipse cx="9" cy="11" rx="4.5" ry="9" fill="currentColor" opacity="0.55" />
            <ellipse cx="9" cy="25" rx="3.4" ry="4.5" fill="currentColor" opacity="0.55" />
          </motion.svg>
        ))}
      </div>

      {/* Hidden Treasure #1: Seashell on the shoreline */}
      <button
        type="button"
        onClick={() => discoverTreasure('treasure-1')}
        aria-label={shellFound ? 'Shoreline seashell discovered' : 'Inspect small seashell on the sand'}
        title={shellFound ? 'Found: The Tide-Line Seashell' : 'A small shell on the shore'}
        className={`group absolute bottom-10 left-[14%] sm:left-[21%] z-20 p-3 cursor-pointer transition-transform duration-300 hover:scale-110 ${
          shellFound ? 'text-[#D8A45B]' : 'text-[#E8D6B8]/80 hover:text-[#F8F3E9]'
        }`}
      >
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
          <path
            d="M14 3C8.5 3 5 8 5 13.5C8 15 11 16 14 16C17 16 20 15 23 13.5C23 8 19.5 3 14 3Z"
            fill="currentColor"
            fillOpacity={shellFound ? '0.38' : '0.18'}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d="M14 3V16M9.5 5.5L11.5 15M18.5 5.5L16.5 15" stroke="currentColor" strokeWidth="0.9" />
        </svg>
        <span className="sr-only">Discover shoreline shell</span>
      </button>

      {/* Top discreet skip intro */}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex items-center justify-end">
        <button
          type="button"
          onClick={() => navigateToSection('destinations', 'chapter-destinations')}
          className="text-xs tracking-wide text-[#E8D6B8]/80 hover:text-[#F8F3E9] underline underline-offset-4 cursor-pointer"
        >
          {SITE_CONTENT.opening.skipIntroLabel}
        </button>
      </div>

      {/* Main emotional opening statement */}
      <div className="relative z-10 mx-auto w-full max-w-4xl my-auto py-12">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-mono-meta text-xs tracking-widest text-[#E8D6B8]"
        >
          Chapter 01 · Golden Hour Shore
        </motion.p>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-4 font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#F8F3E9] max-w-3xl"
        >
          {SITE_CONTENT.opening.headline}
        </motion.h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-5 text-base sm:text-xl leading-relaxed text-[#E8D6B8] max-w-xl"
        >
          {SITE_CONTENT.opening.subheading}
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <button
            type="button"
            onClick={handleBegin}
            className="inline-flex items-center gap-3 bg-[#D8A45B] px-7 py-3.5 text-sm font-medium text-[#091521] transition-transform duration-200 hover:translate-y-[-1px] cursor-pointer"
          >
            <span>{SITE_CONTENT.opening.primaryCta}</span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>

      {/* Handwritten signature at the bottom */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 mx-auto w-full max-w-4xl flex items-center justify-between"
      >
        <p className="font-hand text-2xl sm:text-3xl text-[#E8D6B8]">
          {SITE_CONTENT.opening.signature}
        </p>
      </motion.div>
    </section>
  );
};
