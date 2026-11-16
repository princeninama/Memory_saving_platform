import React, { useState } from 'react';
import { Train, Ticket } from 'lucide-react';
import { DELHI_FRAGMENTS } from '../data/memories';
import { useUniverseState } from '../hooks/useUniverseState';
import { MediaFrame } from '../components/MediaFrame';
import { DelhiFragment } from '../types/universe';

const LINE_COLORS: Record<DelhiFragment['lineColor'], string> = {
  yellow: '#D8A45B',
  blue: '#6BA4C8',
  violet: '#C98F89',
  magenta: '#B57B8C',
};

export const WorldDelhi: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<DelhiFragment>(DELHI_FRAGMENTS[0]);
  const { discoverTreasure, discoveredTreasures, pauseBackgroundMusicForMedia } = useUniverseState();

  const tokenFound = discoveredTreasures.includes('treasure-4');

  return (
    <div className="bg-[#091521] text-[#F8F3E9] py-20 sm:py-28 px-6 sm:px-12 border-t border-[#E8D6B8]/10">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* City Film Masthead */}
        <header className="border-b border-[#E8D6B8]/15 pb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="font-mono-meta text-xs text-[#D8A45B]">
              Memory World C · Nostalgic City Film
            </p>
            <h2 className="mt-3 font-editorial text-4xl sm:text-6xl font-normal text-[#F8F3E9]">
              Delhi Life
            </h2>
            <p className="mt-3 font-hand text-2xl sm:text-3xl text-[#AEBCC5]">
              "A city full of little chapters."
            </p>
          </div>

          {/* Hidden Treasure #4: Paper Metro Token */}
          <button
            type="button"
            onClick={() => discoverTreasure('treasure-4')}
            className={`inline-flex items-center gap-2 border px-4 py-2.5 text-xs cursor-pointer self-start lg:self-end transition-colors ${
              tokenFound
                ? 'border-[#D8A45B] bg-[#D8A45B]/20 text-[#E8D6B8]'
                : 'border-[#E8D6B8]/25 text-[#AEBCC5] hover:border-[#D8A45B]'
            }`}
          >
            <Ticket className="h-4 w-4 text-[#D8A45B]" aria-hidden="true" />
            <span>
              {tokenFound
                ? 'Found: Paper Metro Token'
                : 'Collect metro token by the night platform'}
            </span>
          </button>
        </header>

        {/* Visual City Metro Line Map */}
        <section aria-labelledby="delhi-metro-heading" className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch">
          <div className="border border-[#E8D6B8]/20 bg-[#102D3A]/30 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-meta text-[#D8A45B]">
                <Train className="h-3.5 w-3.5" aria-hidden="true" />
                <span>City Memory Line</span>
              </div>
              <h3 id="delhi-metro-heading" className="mt-2 font-editorial text-3xl text-[#F8F3E9]">
                Stations of Ordinary Days
              </h3>
              <p className="mt-2 text-xs text-[#AEBCC5]">
                Select any station node to read or hear the memory tied to that neighborhood.
              </p>
            </div>

            <div className="relative my-8 h-56 w-full border border-[#E8D6B8]/10 bg-[#091521]/80 overflow-hidden">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <polyline
                  points={DELHI_FRAGMENTS.map((f) => `${f.mapX},${f.mapY}`).join(' ')}
                  fill="none"
                  stroke="#E8D6B8"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  opacity="0.5"
                />
              </svg>

              {DELHI_FRAGMENTS.map((frag) => {
                const active = selectedStation.id === frag.id;
                return (
                  <button
                    key={frag.id}
                    type="button"
                    onClick={() => setSelectedStation(frag)}
                    style={{ left: `${frag.mapX}%`, top: `${frag.mapY}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                  >
                    <span
                      style={{ backgroundColor: LINE_COLORS[frag.lineColor] }}
                      className={`h-4 w-4 rounded-full border-2 border-[#091521] transition-transform ${
                        active ? 'scale-150 ring-2 ring-[#F8F3E9]' : 'group-hover:scale-125'
                      }`}
                    />
                    <span className="mt-1.5 bg-[#091521]/90 px-2 py-0.5 text-[10px] font-mono-meta text-[#E8D6B8] whitespace-nowrap">
                      {frag.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {DELHI_FRAGMENTS.map((frag) => (
                <button
                  key={frag.id}
                  type="button"
                  onClick={() => setSelectedStation(frag)}
                  className={`px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                    selectedStation.id === frag.id
                      ? 'bg-[#D8A45B] text-[#091521] font-medium'
                      : 'border border-[#E8D6B8]/20 text-[#AEBCC5] hover:text-[#F8F3E9]'
                  }`}
                >
                  {frag.stationName.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Selected City Station Card */}
          <div className="border border-[#E8D6B8]/20 bg-[#102D3A]/45 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <MediaFrame
                src={selectedStation.fragmentType === 'photo' ? selectedStation.mediaPath : undefined}
                fallbackSrc={selectedStation.fallbackScene}
                alt={selectedStation.title}
                aspectClass="aspect-[16/10]"
                allowLocalPreview
              />
              <p className="mt-5 font-mono-meta text-xs text-[#D8A45B]">
                {selectedStation.stationName} · {selectedStation.date}
              </p>
              <h4 className="mt-1 font-editorial text-2xl text-[#F8F3E9]">
                {selectedStation.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#E8D6B8]/85">
                {selectedStation.content}
              </p>
            </div>

            {selectedStation.audioPath ? (
              <div className="mt-5 pt-4 border-t border-[#E8D6B8]/15">
                <p className="text-xs text-[#AEBCC5] mb-2">Street / Voice Audio Fragment</p>
                <audio
                  controls
                  preload="none"
                  src={selectedStation.audioPath}
                  onPlay={pauseBackgroundMusicForMedia}
                  className="w-full h-9"
                />
              </div>
            ) : null}
          </div>
        </section>

        {/* Scroll Fragments: "Little things that made ordinary days special." */}
        <section aria-labelledby="delhi-fragments-heading" className="border-t border-[#E8D6B8]/15 pt-16">
          <div className="max-w-2xl mb-12">
            <p className="font-mono-meta text-xs text-[#C98F89]">Memory Fragments</p>
            <h3 id="delhi-fragments-heading" className="mt-2 font-editorial text-3xl sm:text-5xl text-[#F8F3E9]">
              Little things that made ordinary days special.
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {DELHI_FRAGMENTS.map((frag, index) => (
              <article
                key={frag.id}
                className="border border-[#E8D6B8]/15 bg-[#102D3A]/25 p-6 space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-mono-meta text-[#AEBCC5]">
                  <span>Fragment 0{index + 1} · {frag.fragmentType}</span>
                  <span>{frag.date}</span>
                </div>
                <h4 className="font-editorial text-2xl text-[#F8F3E9]">{frag.title}</h4>
                <p className="text-sm leading-relaxed text-[#E8D6B8]/85">{frag.content}</p>
                {frag.fragmentType === 'video' && frag.mediaPath ? (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={frag.fallbackScene}
                    src={frag.mediaPath}
                    onPlay={pauseBackgroundMusicForMedia}
                    className="w-full aspect-video bg-black object-cover"
                  />
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
