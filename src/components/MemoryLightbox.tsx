import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useUniverseState } from '../hooks/useUniverseState';
import { MediaFrame } from './MediaFrame';

export const MemoryLightbox: React.FC = () => {
  const { lightboxMemory, setLightboxMemory } = useUniverseState();

  useEffect(() => {
    if (!lightboxMemory) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxMemory(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxMemory, setLightboxMemory]);

  if (!lightboxMemory) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#091521]/92 p-4 sm:p-10 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={() => setLightboxMemory(null)}
        aria-label="Close memory viewer"
        className="fixed right-5 top-5 z-10 p-2.5 text-[#F8F3E9] border border-[#E8D6B8]/25 bg-[#091521]/80 hover:border-[#D8A45B] cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="w-full max-w-4xl grid gap-6 md:grid-cols-[1.5fr_1fr] items-center">
        <MediaFrame
          src={lightboxMemory.imagePath}
          fallbackSrc={lightboxMemory.fallbackScene}
          alt={lightboxMemory.title}
          aspectClass="aspect-[4/3]"
          allowLocalPreview
          slotHint="Upload image to private-media or click Preview photo"
        />

        <div className="text-[#F8F3E9] space-y-3">
          <p className="font-mono-meta text-xs text-[#D8A45B]">
            {lightboxMemory.date || 'Editable date'} · {lightboxMemory.location || 'Memory'}
          </p>
          <h3 id="lightbox-title" className="font-editorial text-3xl leading-tight">
            {lightboxMemory.title}
          </h3>
          <p className="text-sm leading-relaxed text-[#AEBCC5]">
            {lightboxMemory.description}
          </p>
          {lightboxMemory.handwrittenNote ? (
            <p className="pt-2 font-hand text-2xl text-[#E8D6B8]">
              {lightboxMemory.handwrittenNote}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
