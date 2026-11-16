import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sun } from 'lucide-react';
import { HAMPTA_STARS, TUNGNATH_PHOTOS } from '../data/mountains';
import { SCENE_ASSETS } from '../data/siteContent';
import { useUniverseState } from '../hooks/useUniverseState';
import { MediaFrame } from '../components/MediaFrame';
import { StarMemory } from '../types/universe';

export const Chapter05Mountains: React.FC = () => {
  const [selectedStar, setSelectedStar] = useState<StarMemory>(HAMPTA_STARS[0]);
  const [dawnProgress, setDawnProgress] = useState(65); // 0 = pre-dawn midnight, 100 = full golden sunrise
  const [activeMountainPhotoId, setActiveMountainPhotoId] = useState<string>(TUNGNATH_PHOTOS[0].id);

  const { discoverTreasure, discoveredTreasures, reducedMotion } = useUniverseState();
  const dawnTreasureFound = discoveredTreasures.includes('treasure-6');

  // Generate deterministic subtle starfield points once
  const ambientStars = useMemo(() => {
    return Array.from({ length: 130 }, (_, i) => {
      const x = ((i * 73 + 19) % 98) + 1;
      const y = ((i * 41 + 11) % 72) + 3;
      const size = i % 9 === 0 ? 2.2 : i % 3 === 0 ? 1.5 : 1;
      const delay = (i % 7) * 0.6;
      return { id: i, x, y, size, delay };
    });
  }, []);

  const handleSelectStar = (star: StarMemory) => {
    setSelectedStar(star);
    if (star.treasureId) {
      discoverTreasure(star.treasureId);
    }
  };

  return (
    <section
      id="chapter-mountains"
      className="relative w-full bg-[#091521] text-[#F8F3E9] overflow-hidden"
    >
      {/* Part 5A: Winding Mountain Road Transition */}
      <div className="relative min-h-[85vh] flex items-center justify-center px-6 sm:px-12 py-28 overflow-hidden">
        <img
          src={SCENE_ASSETS.travelMountainRoad}
          alt="Winding Himalayan mountain road through pine valley mist"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#102D3A]/85 via-[#091521]/55 to-[#091521]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/4 h-48 bg-gradient-to-r from-transparent via-[#AEBCC5]/15 to-transparent blur-2xl animate-cloud-slow"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="font-mono-meta text-xs tracking-widest text-[#AEBCC5]">
            Chapter 05 · Towards the Himalayas
          </p>
          <h2 className="mt-4 font-editorial text-4xl sm:text-6xl font-normal leading-tight text-[#F8F3E9]">
            Some journeys don't end when we return home.
          </h2>
          <p className="mt-4 font-hand text-3xl sm:text-4xl text-[#AEBCC5]">
            They stay somewhere inside us.
          </p>
        </div>
      </div>

      {/* Part 5B: The Sky of Hampta Pass */}
      <div className="relative px-6 sm:px-12 py-24 bg-[#091521]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl mb-10">
            <p className="font-mono-meta text-xs text-[#AEBCC5]">
              The Sky of Hampta Pass
            </p>
            <h3 className="mt-2 font-editorial text-3xl sm:text-5xl text-[#F8F3E9]">
              Every little light has a story.
            </h3>
            <p className="mt-2 text-sm text-[#AEBCC5]">
              Click any luminous star in the night sky to open the memory tied to it.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-stretch">
            {/* Interactive Starry Sky Canvas */}
            <div className="relative min-h-[420px] sm:min-h-[480px] overflow-hidden border border-[#AEBCC5]/20 bg-gradient-to-b from-[#050C14] via-[#091521] to-[#102D3A]">
              {/* Subtle ambient stars */}
              {ambientStars.map((st) => (
                <span
                  key={st.id}
                  aria-hidden="true"
                  style={{
                    left: `${st.x}%`,
                    top: `${st.y}%`,
                    width: `${st.size}px`,
                    height: `${st.size}px`,
                    animationDelay: `${st.delay}s`,
                  }}
                  className="absolute rounded-full bg-[#F8F3E9]/80 animate-twinkle"
                />
              ))}

              {/* Occasional subtle shooting star */}
              {!reducedMotion ? (
                <motion.span
                  aria-hidden="true"
                  initial={{ x: '15%', y: '12%', opacity: 0 }}
                  animate={{ x: ['15%', '55%'], y: ['12%', '32%'], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 7 }}
                  className="pointer-events-none absolute h-[1.5px] w-16 -rotate-[25deg] bg-gradient-to-r from-transparent via-[#F8F3E9] to-transparent"
                />
              ) : null}

              {/* Constellation lines connecting key stars */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full pointer-events-none">
                <polyline
                  points={HAMPTA_STARS.map((s) => `${s.x},${s.y}`).join(' ')}
                  fill="none"
                  stroke="#AEBCC5"
                  strokeWidth="0.22"
                  strokeDasharray="1.5 1.5"
                  opacity="0.35"
                />
              </svg>

              {/* Interactive Memory Stars */}
              {HAMPTA_STARS.map((star) => {
                const isSelected = selectedStar.id === star.id;
                return (
                  <button
                    key={star.id}
                    type="button"
                    onClick={() => handleSelectStar(star)}
                    style={{ left: `${star.x}%`, top: `${star.y}%` }}
                    aria-label={`Inspect star memory: ${star.label}`}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 p-3 cursor-pointer"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'h-4 w-4 bg-[#D8A45B] shadow-[0_0_18px_rgba(216,164,91,0.9)]'
                          : star.treasureId
                            ? 'h-3 w-3 bg-[#E8D6B8] shadow-[0_0_14px_rgba(232,214,184,0.85)] group-hover:scale-125'
                            : 'h-2.5 w-2.5 bg-[#F8F3E9] shadow-[0_0_10px_rgba(248,243,233,0.75)] group-hover:scale-125'
                      }`}
                    />
                    <span className="mt-1.5 block text-[10px] font-mono-meta text-[#AEBCC5] group-hover:text-[#F8F3E9] whitespace-nowrap">
                      {star.label}
                    </span>
                  </button>
                );
              })}

              {/* Mountain horizon silhouette */}
              <svg
                viewBox="0 0 1000 220"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 w-full h-32"
              >
                <path
                  d="M0 220 L0 150 L120 95 L230 140 L370 72 L520 135 L660 64 L810 128 L930 85 L1000 120 L1000 220 Z"
                  fill="#050C14"
                />
                <path
                  d="M0 220 L0 175 L180 135 L340 165 L510 118 L700 162 L860 125 L1000 160 L1000 220 Z"
                  fill="#091521"
                />
              </svg>
            </div>

            {/* Selected Star Memory Drawer */}
            <div className="border border-[#AEBCC5]/20 bg-[#102D3A]/35 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono-meta text-[#D8A45B]">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{selectedStar.label}</span>
                  </span>
                  <span>{selectedStar.date || 'Hampta Pass'}</span>
                </div>

                <h4 className="mt-4 font-editorial text-3xl text-[#F8F3E9]">
                  {selectedStar.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[#E8D6B8]/90">
                  {selectedStar.note}
                </p>

                {selectedStar.treasureId ? (
                  <p className="mt-4 text-xs text-[#D8A45B]">
                    Constellation treasure discovered: Silver River Star.
                  </p>
                ) : null}

                {selectedStar.imagePath ? (
                  <div className="mt-5">
                    <MediaFrame
                      src={selectedStar.imagePath}
                      fallbackSrc={SCENE_ASSETS.tungnathSunrise}
                      alt={selectedStar.title}
                      aspectClass="aspect-[16/10]"
                      allowLocalPreview
                    />
                  </div>
                ) : null}
              </div>

              <div className="mt-6 pt-4 border-t border-[#AEBCC5]/15 flex flex-wrap gap-2">
                {HAMPTA_STARS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectStar(s)}
                    className={`px-2.5 py-1 text-xs cursor-pointer transition-colors ${
                      selectedStar.id === s.id
                        ? 'bg-[#D8A45B] text-[#091521] font-medium'
                        : 'border border-[#AEBCC5]/25 text-[#AEBCC5] hover:text-[#F8F3E9]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 5C: The Tungnath Sunrise */}
      <div className="relative px-6 sm:px-12 py-24 sm:py-32 transition-colors duration-700 bg-gradient-to-b from-[#091521] via-[#102D3A] to-[#1A343E]">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-mono-meta text-xs text-[#D8A45B]">
                The Tungnath Sunrise
              </p>
              <h3 className="mt-3 font-editorial text-4xl sm:text-6xl font-normal text-[#F8F3E9]">
                After every long night, there is a sunrise.
              </h3>
            </div>

            {/* Interactive Dawn Light Slider + Treasure #6 */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-3 border border-[#E8D6B8]/20 bg-[#091521]/70 px-4 py-2.5 text-xs text-[#E8D6B8]">
                <Sun className="h-4 w-4 text-[#D8A45B]" aria-hidden="true" />
                <span>Dawn light</span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={dawnProgress}
                  onChange={(e) => setDawnProgress(Number(e.target.value))}
                  aria-label="Adjust sunrise golden light intensity"
                  className="w-24 accent-[#D8A45B] cursor-pointer"
                />
              </label>

              <button
                type="button"
                onClick={() => discoverTreasure('treasure-6')}
                className={`border px-4 py-2.5 text-xs cursor-pointer transition-colors ${
                  dawnTreasureFound
                    ? 'border-[#D8A45B] bg-[#D8A45B]/20 text-[#E8D6B8]'
                    : 'border-[#E8D6B8]/25 text-[#AEBCC5] hover:border-[#D8A45B]'
                }`}
              >
                {dawnTreasureFound ? 'Found: First Dawn Ray' : 'Touch the first golden peak'}
              </button>
            </div>
          </div>

          {/* Interactive Sunrise Hero Canvas */}
          <div className="relative overflow-hidden border border-[#E8D6B8]/20">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={SCENE_ASSETS.tungnathSunrise}
                alt="Tungnath Himalayan sunrise over mist-filled valleys"
                referrerPolicy="no-referrer"
                style={{
                  filter: `brightness(${0.45 + (dawnProgress / 100) * 0.65}) saturate(${0.5 + (dawnProgress / 100) * 0.65})`,
                }}
                className="h-full w-full object-cover transition-all duration-300"
              />
              <div
                aria-hidden="true"
                style={{ opacity: (dawnProgress / 100) * 0.45 }}
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,_rgba(216,164,91,0.55),_transparent_60%)]"
              />
            </div>
          </div>

          {/* Editorial & Monochrome Journey Photographs */}
          <div className="grid gap-10 lg:grid-cols-3">
            {TUNGNATH_PHOTOS.map((photo) => {
              const selected = activeMountainPhotoId === photo.id;
              return (
                <article
                  key={photo.id}
                  onClick={() => setActiveMountainPhotoId(photo.id)}
                  className={`cursor-pointer border p-4 transition-colors ${
                    selected
                      ? 'border-[#D8A45B] bg-[#091521]/80'
                      : 'border-[#E8D6B8]/15 bg-[#091521]/45 hover:border-[#E8D6B8]/40'
                  }`}
                >
                  <MediaFrame
                    src={photo.imagePath}
                    fallbackSrc={SCENE_ASSETS.tungnathSunrise}
                    alt={photo.title}
                    aspectClass="aspect-[4/3]"
                    grayscale={photo.isMonochrome}
                    allowLocalPreview
                  />
                  <div className="mt-4">
                    <p className="font-mono-meta text-[11px] text-[#D8A45B]">
                      {photo.location} · {photo.date}
                    </p>
                    <h4 className="mt-1 font-editorial text-2xl text-[#F8F3E9]">
                      {photo.title}
                    </h4>
                    <p className="mt-2 text-sm text-[#E8D6B8]/85">{photo.memoryNote}</p>
                    <p className="mt-2 font-hand text-xl text-[#AEBCC5]">"{photo.caption}"</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
