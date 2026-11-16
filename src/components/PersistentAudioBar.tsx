import React, { useEffect, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

export const PersistentAudioBar: React.FC = () => {
  const [state, setState] = useState(ambientAudio.getState());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    return ambientAudio.subscribe(() => {
      setState(ambientAudio.getState());
    });
  }, []);

  return (
    <aside
      aria-label="Background music controls"
      className="fixed bottom-4 right-4 z-30 flex items-center gap-2 border border-[#E8D6B8]/25 bg-[#091521]/85 px-3 py-2 text-[#F8F3E9] backdrop-blur-md shadow-lg"
    >
      <button
        type="button"
        onClick={() => ambientAudio.toggle()}
        aria-label={state.isPlaying ? 'Pause ambient soundtrack' : 'Play ambient soundtrack'}
        className="flex h-8 w-8 items-center justify-center bg-[#D8A45B] text-[#091521] cursor-pointer transition-opacity hover:opacity-90"
      >
        {state.isPlaying ? (
          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Play className="h-3.5 w-3.5 ml-0.5" aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="text-left cursor-pointer pr-1"
      >
        <span className="block text-[11px] leading-tight text-[#E8D6B8] max-w-[140px] truncate">
          {state.trackTitle}
        </span>
        <span className="block text-[10px] text-[#AEBCC5]">
          {state.isPlaying ? 'Playing gently' : 'Sound paused'}
        </span>
      </button>

      {expanded ? (
        <div className="flex items-center gap-2 border-l border-[#E8D6B8]/15 pl-2.5">
          <button
            type="button"
            onClick={() => ambientAudio.setVolume(state.volume === 0 ? 0.35 : 0)}
            aria-label={state.volume === 0 ? 'Unmute' : 'Mute'}
            className="text-[#AEBCC5] hover:text-[#F8F3E9] cursor-pointer"
          >
            {state.volume === 0 ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={state.volume}
            onChange={(e) => ambientAudio.setVolume(Number(e.target.value))}
            aria-label="Background music volume"
            className="w-16 accent-[#D8A45B] cursor-pointer"
          />
        </div>
      ) : null}
    </aside>
  );
};
