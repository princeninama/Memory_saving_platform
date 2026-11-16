import React, { useEffect } from 'react';
import { Shuffle, X } from 'lucide-react';
import { useUniverseState } from '../hooks/useUniverseState';
import { MediaFrame } from './MediaFrame';

export const SurpriseMeModal: React.FC = () => {
  const {
    surpriseOpen,
    closeSurpriseMemory,
    openSurpriseMemory,
    currentSurpriseItem,
  } = useUniverseState();

  useEffect(() => {
    if (!surpriseOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSurpriseMemory();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [surpriseOpen, closeSurpriseMemory]);

  if (!surpriseOpen || !currentSurpriseItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="surprise-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#091521]/88 p-4 sm:p-8 backdrop-blur-md"
    >
      <div className="w-full max-w-xl border border-[#E8D6B8]/25 bg-[#091521] p-6 sm:p-8 text-[#F8F3E9]">
        <div className="flex items-center justify-between border-b border-[#E8D6B8]/15 pb-4">
          <span className="font-mono-meta text-xs text-[#D8A45B]">
            Random Memory · {currentSurpriseItem.chapter}
          </span>
          <button
            type="button"
            onClick={closeSurpriseMemory}
            aria-label="Close random memory"
            className="p-1.5 text-[#AEBCC5] hover:text-[#F8F3E9] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">
          {currentSurpriseItem.imagePath || currentSurpriseItem.fallbackScene ? (
            <MediaFrame
              src={currentSurpriseItem.imagePath}
              fallbackSrc={currentSurpriseItem.fallbackScene}
              alt={currentSurpriseItem.title}
              aspectClass="aspect-[16/10]"
            />
          ) : null}

          <div className="mt-5">
            <p className="font-mono-meta text-xs text-[#AEBCC5]">
              {currentSurpriseItem.date || 'Memory'} · {currentSurpriseItem.location || 'Our World'}
            </p>
            <h3 id="surprise-modal-title" className="mt-1 font-editorial text-2xl sm:text-3xl text-[#F8F3E9]">
              {currentSurpriseItem.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#E8D6B8]/90">
              {currentSurpriseItem.description}
            </p>
            {currentSurpriseItem.handwrittenNote ? (
              <p className="mt-3 font-hand text-xl text-[#D8A45B]">
                "{currentSurpriseItem.handwrittenNote}"
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#E8D6B8]/12">
            <button
              type="button"
              onClick={openSurpriseMemory}
              className="inline-flex items-center gap-2 bg-[#D8A45B] px-4 py-2 text-xs font-medium text-[#091521] hover:opacity-90 cursor-pointer"
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Show another memory</span>
            </button>
            <button
              type="button"
              onClick={closeSurpriseMemory}
              className="text-xs text-[#AEBCC5] hover:text-[#F8F3E9] cursor-pointer"
            >
              Return to page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
