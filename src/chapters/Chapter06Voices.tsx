import React, { useEffect, useRef, useState } from 'react';
import {
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Upload,
  Volume2,
  FileText,
} from 'lucide-react';
import { VOICE_RECORDINGS } from '../data/voicesAndMusic';
import { VoiceRecording } from '../types/universe';
import { MediaFrame } from '../components/MediaFrame';
import { useUniverseState } from '../hooks/useUniverseState';

function formatSeconds(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const VoiceDeck: React.FC<{
  title: string;
  subtitle: string;
  accentColor: string;
  recordings: VoiceRecording[];
}> = ({ title, subtitle, accentColor, recordings }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [speed, setSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(true);
  const [audioMissing, setAudioMissing] = useState(false);
  const [localFiles, setLocalFiles] = useState<Record<string, string>>({});

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceConnectedRef = useRef(false);

  const { pauseBackgroundMusicForMedia } = useUniverseState();
  const active = recordings[index];
  const activeSrc = localFiles[active.id] || active.audioPath;

  useEffect(() => {
    setAudioMissing(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [active.id, activeSrc]);

  useEffect(() => {
    return () => {
      Object.values(localFiles).forEach((u) => URL.revokeObjectURL(u));
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [localFiles]);

  // Draw waveform bar visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const bars = 40;
      const gap = width / bars;
      const dataArray = analyserRef.current
        ? new Uint8Array(analyserRef.current.frequencyBinCount)
        : null;

      if (analyserRef.current && dataArray && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
      }

      for (let i = 0; i < bars; i++) {
        let barHeight = 6 + Math.sin(i * 0.7) * 4;
        if (dataArray && isPlaying) {
          const val = dataArray[Math.floor((i / bars) * dataArray.length)] || 0;
          barHeight = Math.max(4, (val / 255) * (height - 8));
        }
        const progressRatio = duration > 0 ? currentTime / duration : 0;
        const isPast = i / bars <= progressRatio;
        ctx.fillStyle = isPast ? accentColor : 'rgba(248, 243, 233, 0.25)';
        ctx.fillRect(i * gap + 1, (height - barHeight) / 2, Math.max(2, gap - 3), barHeight);
      }

      if (isPlaying) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, currentTime, duration, accentColor]);

  const setupAnalyser = () => {
    const el = audioRef.current;
    if (!el || sourceConnectedRef.current) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const src = ctx.createMediaElementSource(el);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      src.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceConnectedRef.current = true;
    } catch {
      // Fallback safely to progress-aware waveform
    }
  };

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      pauseBackgroundMusicForMedia();
      setupAnalyser();
      if (audioCtxRef.current?.state === 'suspended') {
        void audioCtxRef.current.resume();
      }
      el.playbackRate = speed;
      el.volume = volume;
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => setAudioMissing(true));
    }
  };

  const handleUploadLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocalFiles((prev) => ({ ...prev, [active.id]: url }));
    setAudioMissing(false);
  };

  return (
    <article className="border border-[#E8D6B8]/20 bg-[#102D3A]/45 p-6 sm:p-8 flex flex-col justify-between">
      <audio
        ref={audioRef}
        src={activeSrc}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setAudioMissing(false);
        }}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          if (!localFiles[active.id]) setAudioMissing(true);
        }}
      />

      <div>
        <div className="flex items-center justify-between gap-2 text-xs font-mono-meta" style={{ color: accentColor }}>
          <span>{title}</span>
          <span>
            {index + 1}/{recordings.length}
          </span>
        </div>

        <h3 className="mt-2 font-editorial text-3xl text-[#F8F3E9]">{subtitle}</h3>

        <div className="mt-5 grid gap-5 sm:grid-cols-[120px_1fr] items-center">
          <MediaFrame
            src={active.visualPath}
            alt={active.title}
            aspectClass="aspect-square"
            allowLocalPreview
          />
          <div>
            <p className="font-mono-meta text-[11px] text-[#AEBCC5]">
              {active.date || 'Editable date'} · {active.collectionTag}
            </p>
            <h4 className="mt-1 font-editorial text-2xl text-[#F8F3E9]">
              {active.title}
            </h4>
            {audioMissing ? (
              <p className="mt-2 text-xs text-[#E8D6B8]/80">
                Upload a real voice note at <span className="font-mono-meta">{active.audioPath}</span> or test a local audio file below.
              </p>
            ) : null}
          </div>
        </div>

        {/* Waveform canvas + progress scrub */}
        <div className="mt-6 bg-[#091521]/75 p-4 border border-[#E8D6B8]/10">
          <canvas
            ref={canvasRef}
            width={480}
            height={56}
            className="w-full h-14 block"
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (audioRef.current) audioRef.current.currentTime = val;
              setCurrentTime(val);
            }}
            aria-label="Seek audio position"
            className="mt-2 w-full accent-[#D8A45B] cursor-pointer"
          />
          <div className="mt-1 flex justify-between font-mono-meta text-[11px] text-[#AEBCC5]">
            <span>{formatSeconds(currentTime)}</span>
            <span>{duration > 0 ? formatSeconds(duration) : active.durationLabel || '--:--'}</span>
          </div>
        </div>

        {/* Full Playback Controls */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIndex((prev) => (prev - 1 + recordings.length) % recordings.length)}
              aria-label="Previous recording"
              className="p-2 border border-[#E8D6B8]/20 text-[#E8D6B8] hover:border-[#D8A45B] cursor-pointer"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              style={{ backgroundColor: accentColor }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#091521] hover:opacity-90 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (!audioRef.current) return;
                audioRef.current.currentTime = 0;
                setCurrentTime(0);
              }}
              aria-label="Replay from start"
              className="p-2 border border-[#E8D6B8]/20 text-[#E8D6B8] hover:border-[#D8A45B] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIndex((prev) => (prev + 1) % recordings.length)}
              aria-label="Next recording"
              className="p-2 border border-[#E8D6B8]/20 text-[#E8D6B8] hover:border-[#D8A45B] cursor-pointer"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed */}
            <button
              type="button"
              onClick={() => {
                const speeds = [0.75, 1, 1.25, 1.5];
                const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
                setSpeed(next);
                if (audioRef.current) audioRef.current.playbackRate = next;
              }}
              className="font-mono-meta text-xs border border-[#E8D6B8]/20 px-2.5 py-1 text-[#E8D6B8] cursor-pointer"
            >
              {speed}x
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5">
              <Volume2 className="h-3.5 w-3.5 text-[#AEBCC5]" aria-hidden="true" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVolume(val);
                  if (audioRef.current) audioRef.current.volume = val;
                }}
                aria-label="Voice volume"
                className="w-16 accent-[#D8A45B] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transcript & Local File Tester */}
      <div className="mt-6 pt-4 border-t border-[#E8D6B8]/15 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setShowTranscript((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs text-[#AEBCC5] hover:text-[#F8F3E9] cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{showTranscript ? 'Hide transcript' : 'Show transcript'}</span>
          </button>

          <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-[#D8A45B] hover:underline">
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Load local audio file</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleUploadLocal}
              className="sr-only"
            />
          </label>
        </div>

        {showTranscript && active.transcript ? (
          <p className="text-xs leading-relaxed text-[#AEBCC5] bg-[#091521]/50 p-3 border border-[#E8D6B8]/10">
            {active.transcript}
          </p>
        ) : null}
      </div>
    </article>
  );
};

export const Chapter06Voices: React.FC = () => {
  const herRecordings = VOICE_RECORDINGS.filter((v) => v.perspective === 'her');
  const myRecordings = VOICE_RECORDINGS.filter((v) => v.perspective === 'mine');

  return (
    <section
      id="chapter-voices"
      className="relative w-full bg-[#091521] text-[#F8F3E9] py-24 sm:py-32 px-6 sm:px-12 border-t border-[#E8D6B8]/10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-14">
          <p className="font-mono-meta text-xs text-[#D8A45B]">
            Chapter 06 · Things our voices should never lose
          </p>
          <h2 className="mt-3 font-editorial text-4xl sm:text-6xl font-normal text-[#F8F3E9]">
            Two voices. Two perspectives. One little world.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#AEBCC5]">
            Only real uploaded recordings play here — never synthetic or imitated voices. Place your files in <span className="font-mono-meta text-xs text-[#E8D6B8]">private-media/audio/her</span> and <span className="font-mono-meta text-xs text-[#E8D6B8]">private-media/audio/mine</span>, or load local audio files directly on either player.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <VoiceDeck
            title="Her Perspective"
            subtitle="Through your eyes."
            accentColor="#C98F89"
            recordings={herRecordings}
          />
          <VoiceDeck
            title="My Perspective"
            subtitle="Through my eyes."
            accentColor="#D8A45B"
            recordings={myRecordings}
          />
        </div>
      </div>
    </section>
  );
};
