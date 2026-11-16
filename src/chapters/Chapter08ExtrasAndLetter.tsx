import React, { useState } from 'react';
import { Lock, MailOpen, BookOpen, MapPin, RotateCcw, Stamp } from 'lucide-react';
import {
  DICTIONARY_ENTRIES,
  FUTURE_DESTINATIONS,
  TIME_CAPSULES,
} from '../data/specialFeatures';
import { SITE_CONTENT } from '../data/siteContent';
import { useUniverseState } from '../hooks/useUniverseState';
import { MediaFrame } from '../components/MediaFrame';

export const Chapter08ExtrasAndLetter: React.FC = () => {
  const [openCapsules, setOpenCapsules] = useState<string[]>([]);
  const [openDictId, setOpenDictId] = useState<string>(DICTIONARY_ENTRIES[0].id);
  const { discoverTreasure, discoveredTreasures, navigateToSection } = useUniverseState();

  const sealFound = discoveredTreasures.includes('treasure-7');

  const isCapsuleUnlockedByDate = (unlockDate?: string) => {
    if (!unlockDate) return true;
    const target = new Date(`${unlockDate}T00:00:00`);
    return new Date() >= target;
  };

  const toggleCapsule = (id: string, unlockDate?: string) => {
    if (!isCapsuleUnlockedByDate(unlockDate)) return;
    setOpenCapsules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Part 9: Time Capsule, Little Dictionary, Future Chapter */}
      <section
        id="chapter-extras"
        className="w-full bg-[#091521] text-[#F8F3E9] py-24 sm:py-32 px-6 sm:px-12 border-t border-[#E8D6B8]/10 space-y-28"
      >
        {/* 14. The Time Capsule */}
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-mono-meta text-xs text-[#D8A45B]">The Time Capsule</p>
              <h2 className="mt-2 font-editorial text-4xl sm:text-5xl text-[#F8F3E9]">
                Letters Sealed in Time
              </h2>
            </div>

            {/* Hidden Treasure #7: Crimson Wax Seal */}
            <button
              type="button"
              onClick={() => discoverTreasure('treasure-7')}
              className={`inline-flex items-center gap-2 border px-4 py-2 text-xs cursor-pointer transition-colors self-start ${
                sealFound
                  ? 'border-[#D8A45B] bg-[#D8A45B]/20 text-[#E8D6B8]'
                  : 'border-[#C98F89]/40 text-[#C98F89] hover:border-[#D8A45B]'
              }`}
            >
              <Stamp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{sealFound ? 'Found: Crimson Wax Seal' : 'Inspect the crimson wax seal'}</span>
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {TIME_CAPSULES.map((capsule) => {
              const dateUnlocked = isCapsuleUnlockedByDate(capsule.unlockDate);
              const isOpen = openCapsules.includes(capsule.id);

              return (
                <article
                  key={capsule.id}
                  className="border border-[#E8D6B8]/20 bg-[#102D3A]/35 p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-meta text-xs text-[#D8A45B]">
                        {capsule.unlockDate
                          ? `Opens on ${capsule.unlockDate}`
                          : 'Open whenever you want'}
                      </p>
                      <h3 className="mt-2 font-editorial text-2xl sm:text-3xl text-[#F8F3E9]">
                        {capsule.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#AEBCC5]">{capsule.subtitle}</p>
                    </div>
                    {dateUnlocked ? (
                      <MailOpen className="h-5 w-5 text-[#D8A45B] shrink-0" aria-hidden="true" />
                    ) : (
                      <Lock className="h-5 w-5 text-[#AEBCC5] shrink-0" aria-hidden="true" />
                    )}
                  </div>

                  {dateUnlocked ? (
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => toggleCapsule(capsule.id, capsule.unlockDate)}
                        className="bg-[#D8A45B] px-4 py-2 text-xs font-medium text-[#091521] hover:opacity-90 cursor-pointer"
                      >
                        {isOpen ? 'Fold letter' : 'Break seal & read'}
                      </button>

                      {isOpen ? (
                        <div className="mt-6 border-t border-[#E8D6B8]/15 pt-5 space-y-3 text-sm leading-relaxed text-[#E8D6B8]">
                          <p className="font-hand text-2xl text-[#D8A45B]">
                            {capsule.salutation}
                          </p>
                          {capsule.body.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                          <p className="pt-2 font-hand text-2xl text-[#E8D6B8]">
                            {capsule.closing}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p className="mt-6 text-xs text-[#AEBCC5] border-t border-[#E8D6B8]/10 pt-4">
                      Sealed until {capsule.unlockDate}. Check back when that day arrives.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* 16. Our Little Dictionary */}
        <div className="mx-auto max-w-5xl border-t border-[#E8D6B8]/15 pt-20">
          <div className="max-w-xl mb-10">
            <p className="font-mono-meta text-xs text-[#C98F89] inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Our Little Dictionary</span>
            </p>
            <h2 className="mt-2 font-editorial text-4xl sm:text-5xl text-[#F8F3E9]">
              Words Only We Understand
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] items-start">
            <div className="border-t border-[#E8D6B8]/15">
              {DICTIONARY_ENTRIES.map((entry) => {
                const active = openDictId === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setOpenDictId(entry.id)}
                    className={`w-full text-left py-4 px-3 border-b border-[#E8D6B8]/15 flex items-baseline justify-between gap-4 cursor-pointer transition-colors ${
                      active ? 'bg-[#102D3A]/60 text-[#D8A45B]' : 'text-[#F8F3E9] hover:bg-[#102D3A]/30'
                    }`}
                  >
                    <span className="font-editorial text-2xl">{entry.term}</span>
                    <span className="font-mono-meta text-[11px] text-[#AEBCC5]">
                      {entry.phoneticOrTag}
                    </span>
                  </button>
                );
              })}
            </div>

            {(() => {
              const entry =
                DICTIONARY_ENTRIES.find((d) => d.id === openDictId) || DICTIONARY_ENTRIES[0];
              return (
                <div className="border border-[#E8D6B8]/20 bg-[#102D3A]/40 p-6 sm:p-8 space-y-4">
                  <p className="font-mono-meta text-xs text-[#D8A45B]">
                    {entry.phoneticOrTag} · {entry.date}
                  </p>
                  <h3 className="font-editorial text-3xl text-[#F8F3E9]">{entry.term}</h3>
                  <p className="text-sm italic text-[#E8D6B8]">"{entry.meaning}"</p>
                  <p className="pt-2 border-t border-[#E8D6B8]/10 text-sm leading-relaxed text-[#AEBCC5]">
                    {entry.memoryStory}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>

        {/* 17. The Future Chapter */}
        <div className="mx-auto max-w-5xl border-t border-[#E8D6B8]/15 pt-20">
          <div className="max-w-2xl mb-12">
            <p className="font-mono-meta text-xs text-[#D8A45B]">
              The Future Chapter · Wishlist
            </p>
            <h2 className="mt-2 font-editorial text-4xl sm:text-5xl text-[#F8F3E9]">
              Places we haven't been yet.
            </h2>
            <p className="mt-2 text-sm text-[#AEBCC5]">
              Kept gently separate from our memories — blank pages waiting for new stories.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {FUTURE_DESTINATIONS.map((dest) => (
              <article
                key={dest.id}
                className="border border-[#E8D6B8]/15 bg-[#102D3A]/25 flex flex-col justify-between"
              >
                <div>
                  <MediaFrame
                    src={dest.imagePath}
                    alt={dest.placeName}
                    aspectClass="aspect-[4/3]"
                  />
                  <div className="p-5 space-y-2">
                    <p className="font-mono-meta text-[11px] text-[#D8A45B] inline-flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      <span>
                        {dest.region} ·{' '}
                        {dest.status === 'visited' ? 'Visited' : 'Not yet visited'}
                      </span>
                    </p>
                    <h3 className="font-editorial text-2xl text-[#F8F3E9]">
                      {dest.placeName}
                    </h3>
                    <p className="text-sm text-[#E8D6B8]/85">{dest.reason}</p>
                    {dest.note ? (
                      <p className="pt-2 text-xs text-[#AEBCC5]">{dest.note}</p>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 18. The Final Letter — Quiet, unadorned typography */}
      <section
        id="chapter-letter"
        className="w-full bg-[#F8F3E9] text-[#102D3A] py-28 sm:py-36 px-6 sm:px-12"
      >
        <div className="mx-auto max-w-2xl space-y-8">
          <p className="font-mono-meta text-xs text-[#344A3B]">
            {SITE_CONTENT.finalLetter.kicker}
          </p>

          <h2 className="font-editorial text-3xl sm:text-5xl font-normal leading-snug text-[#102D3A]">
            {SITE_CONTENT.finalLetter.openingLine}
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#102D3A]/85">
            {SITE_CONTENT.finalLetter.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <p className="font-editorial text-2xl sm:text-3xl italic text-[#102D3A] pt-4">
            {SITE_CONTENT.finalLetter.closingLine}
          </p>

          <div className="pt-4">
            <p className="font-hand text-3xl text-[#C98F89]">
              {SITE_CONTENT.finalLetter.signOff}
            </p>
            <p className="mt-1 font-hand text-2xl text-[#102D3A]">
              {SITE_CONTENT.finalLetter.signature}
            </p>
          </div>

          <div className="pt-10 border-t border-[#102D3A]/15">
            <button
              type="button"
              onClick={() => navigateToSection('beach', 'chapter-beach')}
              className="inline-flex items-center gap-2.5 bg-[#102D3A] px-6 py-3.5 text-xs font-medium text-[#F8F3E9] hover:bg-[#091521] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{SITE_CONTENT.finalLetter.restartCta}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
