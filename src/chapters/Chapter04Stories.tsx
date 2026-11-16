import React, { useRef, useState } from 'react';
import { Volume2, Pause } from 'lucide-react';
import { PERSONAL_STORIES } from '../data/mountains';
import { MediaFrame } from '../components/MediaFrame';
import { useUniverseState } from '../hooks/useUniverseState';

export const Chapter04Stories: React.FC = () => {
  const [playingStoryId, setPlayingStoryId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { pauseBackgroundMusicForMedia } = useUniverseState();

  const toggleVoice = (storyId: string, voicePath?: string) => {
    if (!voicePath) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (playingStoryId === storyId) {
      audio.pause();
      setPlayingStoryId(null);
      return;
    }

    pauseBackgroundMusicForMedia();
    audio.src = voicePath;
    audio
      .play()
      .then(() => setPlayingStoryId(storyId))
      .catch(() => setPlayingStoryId(null));
  };

  return (
    <section
      id="chapter-stories"
      className="relative w-full bg-[#102D3A] text-[#F8F3E9] py-24 sm:py-32 px-6 sm:px-12 border-t border-[#E8D6B8]/10"
    >
      <audio ref={audioRef} onEnded={() => setPlayingStoryId(null)} />

      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-16">
          <p className="font-mono-meta text-xs text-[#D8A45B]">
            Chapter 04 · Personal Storytelling
          </p>
          <h2 className="mt-3 font-editorial text-4xl sm:text-6xl font-normal text-[#F8F3E9]">
            Things I never want to forget.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#AEBCC5]">
            A quiet sequence of moments in your own words. Every title, paragraph, photograph, and voice narration is editable in <span className="font-mono-meta text-xs text-[#E8D6B8]">src/data/mountains.ts</span>.
          </p>
        </div>

        <div className="space-y-20">
          {PERSONAL_STORIES.map((story, idx) => {
            const isEven = idx % 2 === 0;
            const isPlaying = playingStoryId === story.id;
            return (
              <article
                key={story.id}
                className="grid gap-8 lg:grid-cols-12 items-center border-t border-[#E8D6B8]/15 pt-12"
              >
                <div className={isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2'}>
                  <MediaFrame
                    src={story.imagePath}
                    fallbackSrc={story.fallbackScene}
                    alt={story.title}
                    aspectClass="aspect-[16/10]"
                    allowLocalPreview
                  />
                </div>

                <div className={isEven ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-1'}>
                  <p className="font-mono-meta text-xs text-[#D8A45B]">
                    0{idx + 1} · {story.date || 'Editable date'} · {story.location || 'Editable place'}
                  </p>
                  <h3 className="mt-3 font-editorial text-3xl sm:text-4xl text-[#F8F3E9] leading-tight">
                    {story.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8D6B8]/90">
                    {story.paragraph}
                  </p>

                  {story.voicePath ? (
                    <button
                      type="button"
                      onClick={() => toggleVoice(story.id, story.voicePath)}
                      className="mt-6 inline-flex items-center gap-2 border border-[#E8D6B8]/25 px-4 py-2 text-xs text-[#E8D6B8] hover:border-[#D8A45B] cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-3.5 w-3.5 text-[#D8A45B]" aria-hidden="true" />
                          <span>Pause narration</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-3.5 w-3.5 text-[#D8A45B]" aria-hidden="true" />
                          <span>Listen to voice narration (when uploaded)</span>
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
