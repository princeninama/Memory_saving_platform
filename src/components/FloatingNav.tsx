import React, { useState } from 'react';
import { Compass, Menu, Shuffle, X } from 'lucide-react';
import { useUniverseState } from '../hooks/useUniverseState';
import { TREASURE_ITEMS } from '../data/specialFeatures';
import { ChapterId } from '../types/universe';

const NAV_LINKS: { label: string; chapter: ChapterId; targetId: string }[] = [
  { label: 'Home', chapter: 'beach', targetId: 'chapter-beach' },
  { label: 'Our memories', chapter: 'destinations', targetId: 'chapter-destinations' },
  { label: 'Places', chapter: 'mountains', targetId: 'chapter-mountains' },
  { label: 'Our voices', chapter: 'voices', targetId: 'chapter-voices' },
  { label: 'Music room', chapter: 'music', targetId: 'chapter-music' },
];

export const FloatingNav: React.FC<{ onLock?: () => void }> = ({ onLock }) => {
  const {
    activeChapter,
    navigateToSection,
    discoveredTreasures,
    setTreasureModalOpen,
    openSurpriseMemory,
  } = useUniverseState();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLightPaper = activeChapter === 'college' || activeChapter === 'letter';

  const handleNav = (chapter: ChapterId, targetId: string) => {
    navigateToSection(chapter, targetId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop discreet floating header — clean 3-zone contract */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          isLightPaper
            ? 'bg-[#F8F3E9]/85 text-[#102D3A] border-b border-[#102D3A]/10'
            : 'bg-[#091521]/75 text-[#F8F3E9] border-b border-[#E8D6B8]/12'
        } backdrop-blur-md`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-8">
          {/* Zone 1: Single-line brand mark */}
          <button
            type="button"
            onClick={() => handleNav('beach', 'chapter-beach')}
            className="font-editorial text-lg sm:text-xl font-medium tracking-tight whitespace-nowrap shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Just for You
          </button>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav aria-label="Chapter navigation" className="hidden lg:flex items-center gap-6 text-sm">
            {NAV_LINKS.map((item) => {
              const isActive = activeChapter === item.chapter;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNav(item.chapter, item.targetId)}
                  className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    isActive
                      ? 'text-[#D8A45B] font-medium'
                      : isLightPaper
                        ? 'text-[#102D3A]/75 hover:text-[#102D3A]'
                        : 'text-[#E8D6B8]/80 hover:text-[#F8F3E9]'
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#D8A45B]"
                    />
                  ) : null}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setTreasureModalOpen(true)}
              className={`inline-flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                isLightPaper
                  ? 'text-[#102D3A]/75 hover:text-[#102D3A]'
                  : 'text-[#E8D6B8]/80 hover:text-[#F8F3E9]'
              }`}
            >
              <Compass className="h-3.5 w-3.5 text-[#D8A45B]" aria-hidden="true" />
              <span>Treasure hunt</span>
              <span className="font-mono-meta text-xs text-[#D8A45B]">
                {discoveredTreasures.length}/{TREASURE_ITEMS.length}
              </span>
            </button>
          </nav>

          {/* Zone 3: 1 primary discreet action + mobile drawer trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openSurpriseMemory}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer border transition-colors ${
                isLightPaper
                  ? 'border-[#102D3A]/25 text-[#102D3A] hover:bg-[#102D3A] hover:text-[#F8F3E9]'
                  : 'border-[#D8A45B]/40 text-[#E8D6B8] hover:bg-[#D8A45B] hover:text-[#091521]'
              }`}
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Surprise me</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex lg:hidden items-center justify-center p-2 cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Compact mobile menu drawer */}
      {mobileOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chapter menu"
          className="fixed inset-0 z-50 bg-[#091521]/95 text-[#F8F3E9] backdrop-blur-md flex flex-col justify-between p-6 lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-[#E8D6B8]/15 pb-4">
            <span className="font-editorial text-xl text-[#E8D6B8]">Chapters</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[#E8D6B8]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-6">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.chapter, item.targetId)}
                className="text-left font-editorial text-2xl text-[#F8F3E9] hover:text-[#D8A45B] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setTreasureModalOpen(true);
              }}
              className="text-left font-editorial text-2xl text-[#D8A45B] flex items-center gap-2"
            >
              <span>Treasure hunt</span>
              <span className="font-mono-meta text-sm">
                ({discoveredTreasures.length}/{TREASURE_ITEMS.length})
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openSurpriseMemory();
              }}
              className="mt-2 inline-flex w-fit items-center gap-2 border border-[#D8A45B]/50 px-4 py-2.5 text-sm text-[#E8D6B8]"
            >
              <Shuffle className="h-4 w-4" aria-hidden="true" />
              <span>Surprise me</span>
            </button>
          </nav>

          <div className="border-t border-[#E8D6B8]/15 pt-4 flex items-center justify-between text-xs text-[#AEBCC5]">
            <span>Private space</span>
            {onLock ? (
              <button
                type="button"
                onClick={onLock}
                className="underline hover:text-[#F8F3E9]"
              >
                Lock entrance
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
