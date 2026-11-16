import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Film, Pause, Play, RotateCcw, Upload, Volume2, VolumeX } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { useUniverseState } from '../hooks/useUniverseState';

export const Chapter02FirstSmile: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { reducedMotion, pauseBackgroundMusicForMedia } = useUniverseState();

  const [videoMissing, setVideoMissing] = useState(false);
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const frameScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.03]);
  const videoZoom = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.85]);

  useEffect(() => {
    return () => {
      if (localVideoUrl) URL.revokeObjectURL(localVideoUrl);
    };
  }, [localVideoUrl]);

  const activeVideoSrc = localVideoUrl || SITE_CONTENT.chapterTwoSmile.videoPath;

  const handlePlayToggle = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      pauseBackgroundMusicForMedia();
      vid.muted = false;
      setMuted(false);
      void vid.play();
      setPlaying(true);
    } else {
      vid.pause();
      setPlaying(false);
    }
  };

  const handleReplay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    pauseBackgroundMusicForMedia();
    vid.currentTime = 0;
    vid.muted = false;
    setMuted(false);
    void vid.play();
    setPlaying(true);
  };

  const handleMuteToggle = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const nextMuted = !muted;
    vid.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) pauseBackgroundMusicForMedia();
  };

  const handleLocalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocalVideoUrl(url);
    setVideoMissing(false);
    setPlaying(false);
  };

  return (
    <section
      id="chapter-smile"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#091521] text-[#F8F3E9] py-24 sm:py-32 px-6 sm:px-12 flex items-center"
    >
      {/* Surrounding environment gently deepens and softens on scroll */}
      <motion.div
        aria-hidden="true"
        style={reducedMotion ? undefined : { opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(216,164,91,0.16),_rgba(9,21,33,0.98)_70%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="font-mono-meta text-xs text-[#D8A45B]">
            {SITE_CONTENT.chapterTwoSmile.kicker}
          </p>
          <h2 className="mt-3 font-editorial text-3xl sm:text-5xl font-normal leading-tight text-[#F8F3E9]">
            {SITE_CONTENT.chapterTwoSmile.primaryLine}
          </h2>
          <p className="mt-3 font-hand text-2xl text-[#E8D6B8]">
            {SITE_CONTENT.chapterTwoSmile.secondaryLine}
          </p>
        </div>

        {/* Scroll-focused cinematic video frame */}
        <motion.div
          style={reducedMotion ? undefined : { scale: frameScale }}
          className="relative mx-auto overflow-hidden border border-[#E8D6B8]/20 bg-[#102D3A]/40 shadow-2xl"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {!videoMissing ? (
              <motion.video
                ref={videoRef}
                src={activeVideoSrc}
                poster={SITE_CONTENT.chapterTwoSmile.posterPath}
                playsInline
                preload="metadata"
                muted={muted}
                onEnded={() => setPlaying(false)}
                onError={() => {
                  if (!localVideoUrl) setVideoMissing(true);
                }}
                style={reducedMotion ? undefined : { scale: videoZoom }}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="relative flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <img
                  src={SITE_CONTENT.chapterTwoSmile.posterPath}
                  alt="Waiting for uploaded personal video"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover opacity-25 blur-sm"
                />
                <div className="relative z-10 max-w-md space-y-4">
                  <Film className="mx-auto h-8 w-8 text-[#D8A45B]" aria-hidden="true" />
                  <h3 className="font-editorial text-2xl text-[#F8F3E9]">
                    Her Real Video Belongs Here
                  </h3>
                  <p className="text-sm leading-relaxed text-[#E8D6B8]/85">
                    No stock footage or synthetic faces are substituted. {SITE_CONTENT.chapterTwoSmile.uploadHint}
                  </p>
                  <label className="inline-flex cursor-pointer items-center gap-2 bg-[#D8A45B] px-5 py-2.5 text-xs font-medium text-[#091521] hover:opacity-90">
                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Preview local video file</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleLocalFile}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091521]/75 via-transparent to-transparent"
            />
          </div>

          {/* Intimate, non-intrusive video controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#091521]/90 px-5 py-4 border-t border-[#E8D6B8]/15">
            <div className="flex items-center gap-3">
              {!videoMissing ? (
                <>
                  <button
                    type="button"
                    onClick={handlePlayToggle}
                    className="inline-flex items-center gap-2 bg-[#D8A45B] px-4 py-2 text-xs font-medium text-[#091521] hover:opacity-90 cursor-pointer"
                  >
                    {playing ? (
                      <>
                        <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Play moment with sound</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReplay}
                    className="inline-flex items-center gap-1.5 border border-[#E8D6B8]/25 px-3 py-2 text-xs text-[#E8D6B8] hover:border-[#D8A45B] cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Replay</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMuteToggle}
                    aria-label={muted ? 'Unmute video' : 'Mute video'}
                    className="p-2 text-[#AEBCC5] hover:text-[#F8F3E9] cursor-pointer"
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </>
              ) : (
                <span className="font-mono-meta text-xs text-[#AEBCC5]">
                  Target path: private-media/videos/intro/her-smile.mp4
                </span>
              )}
            </div>

            {!videoMissing ? (
              <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-[#AEBCC5] hover:text-[#F8F3E9]">
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Load different clip</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleLocalFile}
                  className="sr-only"
                />
              </label>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
