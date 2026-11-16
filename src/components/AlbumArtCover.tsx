import React from 'react';
import { AlbumMoodTheme } from '../types/universe';

interface AlbumArtCoverProps {
  title: string;
  artist: string;
  theme: AlbumMoodTheme;
  customCoverPath?: string;
}

const THEME_PALETTES: Record<
  AlbumMoodTheme,
  { bg: string; accent: string; secondary: string; ink: string }
> = {
  coastal: { bg: '#E8D6B8', accent: '#D8A45B', secondary: '#102D3A', ink: '#102D3A' },
  twilight: { bg: '#102D3A', accent: '#D8A45B', secondary: '#AEBCC5', ink: '#F8F3E9' },
  sepia: { bg: '#F8F3E9', accent: '#C98F89', secondary: '#344A3B', ink: '#102D3A' },
  forest: { bg: '#344A3B', accent: '#E8D6B8', secondary: '#AEBCC5', ink: '#F8F3E9' },
  midnight: { bg: '#091521', accent: '#D8A45B', secondary: '#AEBCC5', ink: '#F8F3E9' },
};

export const AlbumArtCover: React.FC<AlbumArtCoverProps> = ({
  title,
  artist,
  theme,
  customCoverPath,
}) => {
  const palette = THEME_PALETTES[theme];

  if (customCoverPath) {
    return (
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={customCoverPath}
          alt={`${title} original artwork`}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-square w-full overflow-hidden p-5 flex flex-col justify-between select-none"
      style={{ backgroundColor: palette.bg, color: palette.ink }}
    >
      {/* Original geometric editorial vinyl artwork */}
      <svg
        viewBox="0 0 240 240"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        {theme === 'coastal' && (
          <>
            <circle cx="170" cy="68" r="42" fill={palette.accent} opacity="0.72" />
            <path
              d="M0 156 Q 60 132 120 156 T 240 156 L 240 240 L 0 240 Z"
              fill={palette.secondary}
              opacity="0.22"
            />
            <path
              d="M0 176 Q 60 154 120 176 T 240 176"
              stroke={palette.secondary}
              strokeWidth="1.5"
              fill="none"
            />
          </>
        )}
        {theme === 'twilight' && (
          <>
            <circle cx="120" cy="120" r="76" stroke={palette.accent} strokeWidth="1.2" fill="none" opacity="0.6" />
            <circle cx="120" cy="120" r="44" stroke={palette.secondary} strokeWidth="1" fill="none" opacity="0.4" />
            <circle cx="164" cy="76" r="6" fill={palette.accent} />
          </>
        )}
        {theme === 'sepia' && (
          <>
            <rect x="28" y="28" width="184" height="184" stroke={palette.accent} strokeWidth="1.2" fill="none" opacity="0.55" />
            <circle cx="120" cy="118" r="46" fill={palette.accent} opacity="0.25" />
            <line x1="28" y1="168" x2="212" y2="168" stroke={palette.secondary} strokeWidth="1" opacity="0.4" />
          </>
        )}
        {theme === 'forest' && (
          <>
            <polygon points="0,240 90,110 175,240" fill={palette.accent} opacity="0.16" />
            <polygon points="85,240 175,92 240,210 240,240" fill={palette.secondary} opacity="0.22" />
            <circle cx="62" cy="58" r="14" fill={palette.accent} opacity="0.7" />
          </>
        )}
        {theme === 'midnight' && (
          <>
            <circle cx="120" cy="120" r="66" stroke={palette.secondary} strokeWidth="0.9" strokeDasharray="3 5" fill="none" opacity="0.55" />
            <circle cx="72" cy="64" r="2.2" fill={palette.accent} />
            <circle cx="168" cy="52" r="2.8" fill={palette.ink} />
            <circle cx="182" cy="142" r="2" fill={palette.accent} />
            <circle cx="58" cy="158" r="1.8" fill={palette.ink} />
          </>
        )}
      </svg>

      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-meta opacity-75">
        <span>Original Edition</span>
        <span>33 RPM</span>
      </div>

      <div className="relative z-10">
        <p className="font-editorial text-xl leading-tight line-clamp-2">{title}</p>
        <p className="mt-1 text-xs opacity-75 truncate">{artist}</p>
      </div>
    </div>
  );
};
