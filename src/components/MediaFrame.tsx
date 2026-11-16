import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';

interface MediaFrameProps {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  grayscale?: boolean;
  slotHint?: string;
  allowLocalPreview?: boolean;
  onLocalPreview?: (objectUrl: string) => void;
}

/**
 * Resilient media frame:
 * 1. Tries private /api/media/... path if provided.
 * 2. If not uploaded yet (404), seamlessly displays atmospheric fallbackScene (zero broken images)
 *    with an optional discreet indicator & local file previewer so the owner can test any photo live.
 */
export const MediaFrame: React.FC<MediaFrameProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
  grayscale = false,
  slotHint,
  allowLocalPreview = false,
  onLocalPreview,
}) => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [primaryFailed, setPrimaryFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  useEffect(() => {
    setPrimaryFailed(false);
  }, [src]);

  useEffect(() => {
    return () => {
      if (localUrl) URL.revokeObjectURL(localUrl);
    };
  }, [localUrl]);

  const activeSrc =
    localUrl || (!primaryFailed && src ? src : undefined) || (!fallbackFailed ? fallbackSrc : undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocalUrl(url);
    onLocalPreview?.(url);
  };

  return (
    <div className={`relative overflow-hidden bg-[#102D3A]/40 ${aspectClass} ${className}`}>
      {activeSrc ? (
        <img
          src={activeSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => {
            if (localUrl) {
              setLocalUrl(null);
            } else if (!primaryFailed && src && activeSrc === src) {
              setPrimaryFailed(true);
            } else {
              setFallbackFailed(true);
            }
          }}
          className={`h-full w-full object-cover transition-transform duration-700 ${
            grayscale ? 'grayscale contrast-110' : ''
          }`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#102D3A] to-[#091521] p-6 text-center text-[#AEBCC5]">
          <ImageIcon className="mb-2 h-6 w-6 opacity-60" aria-hidden="true" />
          <p className="text-xs">{alt}</p>
        </div>
      )}

      {primaryFailed && slotHint && !localUrl ? (
        <div className="pointer-events-none absolute bottom-2 left-2 right-2 bg-[#091521]/75 px-3 py-1.5 text-[11px] text-[#E8D6B8] backdrop-blur-sm">
          {slotHint}
        </div>
      ) : null}

      {allowLocalPreview ? (
        <label className="absolute right-2.5 top-2.5 inline-flex cursor-pointer items-center gap-1.5 bg-[#091521]/80 px-2.5 py-1 text-[11px] text-[#F8F3E9] backdrop-blur-sm transition-colors hover:bg-[#D8A45B] hover:text-[#091521]">
          <Upload className="h-3 w-3" aria-hidden="true" />
          <span>Preview photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
      ) : null}
    </div>
  );
};
