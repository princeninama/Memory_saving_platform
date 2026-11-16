import React from 'react';
import { Calendar, MapPin, Bookmark } from 'lucide-react';
import {
  COLLEGE_ENVELOPES,
  COLLEGE_MEMORIES,
  COLLEGE_SCRATCH_CARDS,
  COLLEGE_TIMELINE,
} from '../data/memories';
import { SCENE_ASSETS } from '../data/siteContent';
import { useUniverseState } from '../hooks/useUniverseState';
import { MediaFrame } from '../components/MediaFrame';
import { ScratchCard } from '../components/ScratchCard';
import { EnvelopeNote } from '../components/EnvelopeNote';

export const WorldCollege: React.FC = () => {
  const { setLightboxMemory, discoverTreasure, discoveredTreasures } = useUniverseState();
  const cornerFound = discoveredTreasures.includes('treasure-2');

  return (
    <div className="bg-[#F8F3E9] text-[#102D3A] py-20 sm:py-28 px-6 sm:px-12">
      <div className="mx-auto max-w-6xl space-y-24">
        {/* Scrapbook Masthead */}
        <header className="relative border-b border-[#102D3A]/15 pb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="font-mono-meta text-xs text-[#344A3B]">
              Memory World A · Living Journal &amp; Scrapbook
            </p>
            <h2 className="mt-3 font-editorial text-4xl sm:text-6xl font-normal text-[#102D3A]">
              College Life
            </h2>
            <p className="mt-3 font-hand text-2xl sm:text-3xl text-[#C98F89]">
              "The days that became stories."
            </p>
          </div>

          {/* Hidden Treasure #2: Tucked corner photograph behind the page */}
          <button
            type="button"
            onClick={() => discoverTreasure('treasure-2')}
            className={`self-start lg:self-end inline-flex items-center gap-2 border px-4 py-2.5 text-xs transition-colors cursor-pointer ${
              cornerFound
                ? 'border-[#D8A45B] bg-[#E8D6B8]/60 text-[#102D3A]'
                : 'border-[#102D3A]/20 bg-[#E8D6B8]/30 text-[#102D3A]/75 hover:border-[#D8A45B]'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5 text-[#C98F89]" aria-hidden="true" />
            <span>
              {cornerFound
                ? 'Found: Tucked Margin Photograph'
                : 'A photograph edge peeks out behind this page...'}
            </span>
          </button>
        </header>

        {/* A. Asymmetrical Cinematic Memory Gallery */}
        <section aria-labelledby="college-gallery-heading">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h3 id="college-gallery-heading" className="font-editorial text-3xl text-[#102D3A]">
              Pages from Campus
            </h3>
            <p className="text-xs text-[#102D3A]/65">
              Click any frame to open the full-screen viewer or preview a local photo.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-12 items-start">
            {/* Editorial large left */}
            <figure className="md:col-span-7 group">
              <button
                type="button"
                onClick={() => setLightboxMemory(COLLEGE_MEMORIES[0])}
                className="block w-full text-left cursor-pointer"
              >
                <div className="overflow-hidden border border-[#102D3A]/15 bg-white p-2.5">
                  <MediaFrame
                    src={COLLEGE_MEMORIES[0].imagePath}
                    fallbackSrc={COLLEGE_MEMORIES[0].fallbackScene}
                    alt={COLLEGE_MEMORIES[0].title}
                    aspectClass="aspect-[4/3]"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-editorial text-xl text-[#102D3A]">
                      {COLLEGE_MEMORIES[0].title}
                    </span>
                    <p className="font-hand text-xl text-[#344A3B]">
                      {COLLEGE_MEMORIES[0].handwrittenNote}
                    </p>
                  </div>
                  <span className="font-mono-meta text-[11px] text-[#102D3A]/60 shrink-0">
                    {COLLEGE_MEMORIES[0].date}
                  </span>
                </figcaption>
              </button>
            </figure>

            {/* Polaroid style offset right */}
            <figure className="md:col-span-5 md:mt-14">
              <button
                type="button"
                onClick={() => setLightboxMemory(COLLEGE_MEMORIES[1])}
                className="block w-full text-left cursor-pointer bg-white p-4 pb-8 shadow-md border border-[#102D3A]/10 rotate-[1deg] hover:rotate-0 transition-transform duration-300"
              >
                <MediaFrame
                  src={COLLEGE_MEMORIES[1].imagePath}
                  fallbackSrc={COLLEGE_MEMORIES[1].fallbackScene}
                  alt={COLLEGE_MEMORIES[1].title}
                  aspectClass="aspect-square"
                />
                <figcaption className="mt-4">
                  <p className="font-hand text-2xl text-[#102D3A]">
                    {COLLEGE_MEMORIES[1].handwrittenNote}
                  </p>
                  <p className="mt-1 font-mono-meta text-[11px] text-[#102D3A]/60">
                    {COLLEGE_MEMORIES[1].location} · {COLLEGE_MEMORIES[1].date}
                  </p>
                </figcaption>
              </button>
            </figure>

            {/* 35mm film strip border */}
            <figure className="md:col-span-5">
              <button
                type="button"
                onClick={() => setLightboxMemory(COLLEGE_MEMORIES[2])}
                className="block w-full text-left cursor-pointer bg-[#102D3A] p-4 text-[#F8F3E9]"
              >
                <div className="flex justify-between pb-2 text-[10px] font-mono-meta text-[#D8A45B]">
                  <span>35MM · FRAME 14A</span>
                  <span>{COLLEGE_MEMORIES[2].date}</span>
                </div>
                <MediaFrame
                  src={COLLEGE_MEMORIES[2].imagePath}
                  fallbackSrc={COLLEGE_MEMORIES[2].fallbackScene}
                  alt={COLLEGE_MEMORIES[2].title}
                  aspectClass="aspect-[3/2]"
                />
                <figcaption className="pt-3 flex items-center justify-between gap-2">
                  <span className="font-editorial text-lg">{COLLEGE_MEMORIES[2].title}</span>
                  <span className="font-hand text-lg text-[#E8D6B8]">
                    {COLLEGE_MEMORIES[2].handwrittenNote}
                  </span>
                </figcaption>
              </button>
            </figure>

            {/* Full-bleed spread */}
            <figure className="md:col-span-7">
              <button
                type="button"
                onClick={() => setLightboxMemory(COLLEGE_MEMORIES[3])}
                className="block w-full text-left cursor-pointer"
              >
                <MediaFrame
                  src={COLLEGE_MEMORIES[3].imagePath}
                  fallbackSrc={COLLEGE_MEMORIES[3].fallbackScene || SCENE_ASSETS.collegeCorridor}
                  alt={COLLEGE_MEMORIES[3].title}
                  aspectClass="aspect-[16/9]"
                />
                <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-editorial text-2xl text-[#102D3A]">
                    {COLLEGE_MEMORIES[3].title}
                  </span>
                  <span className="font-mono-meta text-xs text-[#102D3A]/60">
                    {COLLEGE_MEMORIES[3].location} · {COLLEGE_MEMORIES[3].date}
                  </span>
                </figcaption>
              </button>
            </figure>
          </div>
        </section>

        {/* B. Scratch-to-reveal photographs */}
        <section aria-labelledby="scratch-heading" className="border-t border-[#102D3A]/15 pt-16">
          <div className="max-w-xl mb-10">
            <p className="font-mono-meta text-xs text-[#C98F89]">Interactive Keepsakes</p>
            <h3 id="scratch-heading" className="mt-2 font-editorial text-3xl sm:text-4xl text-[#102D3A]">
              Scratch to Uncover
            </h3>
            <p className="mt-2 text-sm text-[#102D3A]/75">
              Brush across the paper surface with your cursor or finger to reveal the photograph beneath.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {COLLEGE_SCRATCH_CARDS.map((card) => (
              <ScratchCard key={card.id} memory={card} />
            ))}
          </div>
        </section>

        {/* C. Hidden Notes (Envelopes) */}
        <section aria-labelledby="envelopes-heading" className="border-t border-[#102D3A]/15 pt-16">
          <div className="max-w-xl mb-10">
            <p className="font-mono-meta text-xs text-[#344A3B]">Hidden Notes</p>
            <h3 id="envelopes-heading" className="mt-2 font-editorial text-3xl sm:text-4xl text-[#102D3A]">
              Little Envelopes in the Margin
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {COLLEGE_ENVELOPES.map((env) => (
              <EnvelopeNote key={env.id} item={env} />
            ))}
          </div>
        </section>

        {/* D. College Memory Timeline */}
        <section aria-labelledby="college-timeline-heading" className="border-t border-[#102D3A]/15 pt-16">
          <div className="max-w-xl mb-10">
            <p className="font-mono-meta text-xs text-[#102D3A]/60">Chronicle</p>
            <h3 id="college-timeline-heading" className="mt-2 font-editorial text-3xl sm:text-4xl text-[#102D3A]">
              College Timeline
            </h3>
          </div>

          <ol className="space-y-8 border-l border-[#102D3A]/20 pl-6 sm:pl-10">
            {COLLEGE_TIMELINE.map((entry) => (
              <li key={entry.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[29px] sm:-left-[45px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#D8A45B]"
                />
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono-meta text-[#102D3A]/65">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {entry.date}
                  </span>
                  {entry.location ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {entry.location}
                    </span>
                  ) : null}
                </div>
                <h4 className="mt-2 font-editorial text-2xl text-[#102D3A]">{entry.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#102D3A]/80 max-w-2xl">
                  {entry.summary}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};
