import React, { useEffect, useState } from 'react';
import { Check, Compass, HelpCircle, Lock, Sparkles, X } from 'lucide-react';
import { FINAL_SECRET_TREASURE, TREASURE_ITEMS } from '../data/specialFeatures';
import { useUniverseState } from '../hooks/useUniverseState';
import { MediaFrame } from './MediaFrame';

export const TreasureTrackerModal: React.FC = () => {
  const {
    treasureModalOpen,
    setTreasureModalOpen,
    discoveredTreasures,
  } = useUniverseState();
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (!treasureModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTreasureModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [treasureModalOpen, setTreasureModalOpen]);

  if (!treasureModalOpen) return null;

  const total = TREASURE_ITEMS.length;
  const count = discoveredTreasures.length;
  const allFound = count >= total;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="treasure-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#091521]/85 p-4 sm:p-8 backdrop-blur-md"
    >
      <div className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto border border-[#E8D6B8]/25 bg-[#091521] p-6 sm:p-10 text-[#F8F3E9]">
        <div className="flex items-start justify-between gap-4 border-b border-[#E8D6B8]/15 pb-6">
          <div>
            <p className="font-mono-meta text-xs text-[#D8A45B]">
              {count}/{total} memories discovered
            </p>
            <h2
              id="treasure-modal-title"
              className="mt-1 font-editorial text-3xl sm:text-4xl text-[#F8F3E9]"
            >
              The Little Things You Haven't Found Yet.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setTreasureModalOpen(false)}
            aria-label="Close treasure collection"
            className="p-2 text-[#AEBCC5] hover:text-[#F8F3E9] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#AEBCC5]">
            Hidden objects rest gently across different chapters. Collect all seven to unlock a final secret note.
          </p>
          <button
            type="button"
            onClick={() => setShowHints((prev) => !prev)}
            className="inline-flex items-center gap-1.5 border border-[#E8D6B8]/25 px-3 py-1.5 text-xs text-[#E8D6B8] hover:border-[#D8A45B] cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#D8A45B]" aria-hidden="true" />
            <span>{showHints ? 'Hide subtle hints' : 'Show subtle hints'}</span>
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {TREASURE_ITEMS.map((item) => {
            const found = discoveredTreasures.includes(item.id);
            return (
              <div
                key={item.id}
                className={`border p-4 transition-colors ${
                  found
                    ? 'border-[#D8A45B]/50 bg-[#102D3A]/55'
                    : 'border-[#E8D6B8]/12 bg-[#102D3A]/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono-meta">
                  <span className={found ? 'text-[#D8A45B]' : 'text-[#AEBCC5]/70'}>
                    0{item.index} · {item.chapterLocation}
                  </span>
                  {found ? (
                    <span className="inline-flex items-center gap-1 text-[#D8A45B]">
                      <Check className="h-3.5 w-3.5" /> Found
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[#AEBCC5]/60">
                      <Lock className="h-3 w-3" /> Hidden
                    </span>
                  )}
                </div>

                <h3 className="mt-2 font-editorial text-xl text-[#F8F3E9]">
                  {found ? item.rewardTitle : item.name}
                </h3>

                {found ? (
                  <div className="mt-2 space-y-3">
                    <p className="text-sm leading-relaxed text-[#E8D6B8]/90">
                      {item.rewardMessage}
                    </p>
                    {item.rewardImagePath ? (
                      <MediaFrame
                        src={item.rewardImagePath}
                        alt={item.rewardTitle}
                        aspectClass="aspect-[16/9]"
                      />
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-2 text-xs leading-relaxed text-[#AEBCC5]">
                    {showHints
                      ? `Hint: ${item.clue}`
                      : 'Keep exploring the chapter above to uncover this object.'}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Final 7/7 Secret Memory */}
        <div
          className={`mt-8 border p-6 ${
            allFound
              ? 'border-[#D8A45B] bg-[#102D3A]/80'
              : 'border-[#E8D6B8]/15 bg-[#091521]/60'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono-meta text-[#D8A45B]">
            {allFound ? <Sparkles className="h-4 w-4" /> : <Compass className="h-4 w-4" />}
            <span>Final Secret Memory · {allFound ? 'Unlocked' : `Unlocks at ${total}/${total}`}</span>
          </div>
          <h3 className="mt-2 font-editorial text-2xl text-[#F8F3E9]">
            {FINAL_SECRET_TREASURE.title}
          </h3>
          {allFound ? (
            <div className="mt-3 space-y-3">
              <p className="text-sm leading-relaxed text-[#E8D6B8]">
                {FINAL_SECRET_TREASURE.letter}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-[#AEBCC5]">
              Find all {total} hidden keepsakes across the chapters to open the last secret note.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
