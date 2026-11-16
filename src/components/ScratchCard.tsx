import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
import { MemoryItem } from '../types/universe';
import { MediaFrame } from './MediaFrame';
import { useUniverseState } from '../hooks/useUniverseState';

interface ScratchCardProps {
  memory: MemoryItem;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ memory }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);

  const [revealed, setRevealed] = useState(false);
  const [percent, setPercent] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const { pauseBackgroundMusicForMedia } = useUniverseState();

  const threshold = memory.scratchThreshold ?? 48;

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(280, Math.floor(rect.width));
    const height = Math.max(240, Math.floor(rect.height));

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    // Textured warm parchment / vintage foil cover
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D7C4A3');
    grad.addColorStop(0.5, '#C5AF8A');
    grad.addColorStop(1, '#B39B75');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle paper grain speckles
    for (let i = 0; i < 900; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.16)' : 'rgba(16,45,58,0.08)';
      ctx.fillRect(px, py, 1.5, 1.5);
    }

    // Fine border line
    ctx.strokeStyle = 'rgba(16,45,58,0.22)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Handwritten prompt
    ctx.fillStyle = '#102D3A';
    ctx.textAlign = 'center';
    ctx.font = '500 22px "Caveat", cursive';
    ctx.fillText("There's something hidden underneath.", width / 2, height / 2 - 6);
    ctx.font = '400 12px "DM Sans", sans-serif';
    ctx.fillStyle = 'rgba(16,45,58,0.75)';
    ctx.fillText('Scratch gently with your cursor or finger', width / 2, height / 2 + 22);
  }, []);

  useEffect(() => {
    paintCover();
    const handleResize = () => {
      if (!revealed) paintCover();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [paintCover, revealed]);

  const computeScratchedPercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    const { width, height } = canvas;
    const imgData = ctx.getImageData(0, 0, width, height).data;
    let transparentPixels = 0;
    // Sample every 16th pixel for fast mobile performance
    const step = 16;
    let sampled = 0;
    for (let i = 3; i < imgData.length; i += 4 * step) {
      sampled += 1;
      if (imgData[i] < 40) transparentPixels += 1;
    }
    return sampled === 0 ? 0 : Math.round((transparentPixels / sampled) * 100);
  }, []);

  const scratchAt = (clientX: number, clientY: number) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 42;

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    } else {
      ctx.moveTo(x, y);
    }
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPointRef.current = { x, y };
    strokeCountRef.current += 1;

    if (strokeCountRef.current % 6 === 0) {
      const pct = computeScratchedPercent();
      setPercent(pct);
      if (pct >= threshold) {
        setRevealed(true);
        setPercent(100);
      }
    }
  };

  const handleReset = () => {
    setRevealed(false);
    setPercent(0);
    strokeCountRef.current = 0;
    lastPointRef.current = null;
    window.requestAnimationFrame(paintCover);
  };

  const toggleVoiceNote = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audioPlaying) {
      audio.pause();
      setAudioPlaying(false);
    } else {
      pauseBackgroundMusicForMedia();
      audio
        .play()
        .then(() => setAudioPlaying(true))
        .catch(() => setAudioAvailable(false));
    }
  };

  return (
    <article className="bg-[#F8F3E9] text-[#102D3A] p-4 sm:p-5 border border-[#102D3A]/15 shadow-sm">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full overflow-hidden select-none touch-none bg-[#E8D6B8]/40"
      >
        <MediaFrame
          src={memory.imagePath}
          fallbackSrc={memory.fallbackScene}
          alt={memory.title}
          aspectClass="h-full w-full"
          allowLocalPreview
          slotHint="Upload image to private-media/images/college/ or click Preview photo"
        />

        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            isDrawingRef.current = true;
            lastPointRef.current = null;
            (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (!isDrawingRef.current) return;
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            isDrawingRef.current = false;
            lastPointRef.current = null;
            const pct = computeScratchedPercent();
            setPercent(pct);
            if (pct >= threshold) {
              setRevealed(true);
              setPercent(100);
            }
          }}
          onPointerCancel={() => {
            isDrawingRef.current = false;
            lastPointRef.current = null;
          }}
          className={`absolute inset-0 h-full w-full cursor-crosshair transition-opacity duration-700 ${
            revealed ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono-meta text-[11px] text-[#102D3A]/60">
            {memory.date || 'College Memory'} · {revealed ? 'Revealed' : `${percent}% uncovered`}
          </p>
          <h4 className="font-editorial text-xl text-[#102D3A] mt-1">
            {revealed ? memory.title : 'Sealed Memory'}
          </h4>
          {revealed ? (
            <p className="mt-1.5 text-sm leading-relaxed text-[#102D3A]/80">
              {memory.description}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => {
                setRevealed(true);
                setPercent(100);
              }}
              className="mt-2 text-xs underline text-[#102D3A]/75 hover:text-[#102D3A] cursor-pointer"
            >
              Reveal without scratching (keyboard)
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {revealed && memory.audioPath ? (
            <>
              <audio
                ref={audioRef}
                src={memory.audioPath}
                onEnded={() => setAudioPlaying(false)}
                onError={() => setAudioAvailable(false)}
              />
              <button
                type="button"
                onClick={toggleVoiceNote}
                disabled={!audioAvailable}
                title={audioAvailable ? 'Play voice memory' : 'Add voice file to enable playback'}
                className="inline-flex items-center gap-1.5 border border-[#102D3A]/20 px-2.5 py-1.5 text-xs text-[#102D3A] hover:bg-[#102D3A] hover:text-[#F8F3E9] disabled:opacity-45 cursor-pointer transition-colors"
              >
                <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{audioPlaying ? 'Pause voice' : audioAvailable ? 'Hear voice' : 'No audio yet'}</span>
              </button>
            </>
          ) : null}

          {revealed ? (
            <button
              type="button"
              onClick={handleReset}
              aria-label="Cover scratch card again"
              className="p-1.5 text-[#102D3A]/60 hover:text-[#102D3A] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};
