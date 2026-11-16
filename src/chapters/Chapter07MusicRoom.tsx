import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Heart, Mic, Play, Square, Trash2, Disc3 } from 'lucide-react';
import { KARAOKE_TRACKS, SOUNDTRACK_SONGS } from '../data/voicesAndMusic';
import { AlbumArtCover } from '../components/AlbumArtCover';
import { useUniverseState } from '../hooks/useUniverseState';
import { SongItem } from '../types/universe';

export const Chapter07MusicRoom: React.FC = () => {
  const { favoriteSongIds, toggleFavoriteSong, pauseBackgroundMusicForMedia } = useUniverseState();
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongItem>(SOUNDTRACK_SONGS[0]);

  // Karaoke Corner state
  const [selectedKaraokeId, setSelectedKaraokeId] = useState(KARAOKE_TRACKS[0].id);
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [micError, setMicError] = useState<string | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const visibleSongs = filterFavorites
    ? SOUNDTRACK_SONGS.filter((s) => favoriteSongIds.includes(s.id))
    : SOUNDTRACK_SONGS;

  const activeKaraoke =
    KARAOKE_TRACKS.find((k) => k.id === selectedKaraokeId) || KARAOKE_TRACKS[0];

  useEffect(() => {
    return () => {
      if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
    };
  }, [recordedAudioUrl]);

  const startRecording = async () => {
    setMicError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicError('Browser microphone recording is not supported in this browser.');
      return;
    }

    try {
      pauseBackgroundMusicForMedia();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
        setRecordedAudioUrl(URL.createObjectURL(blob));
        setRecordingState('recorded');
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecordingState('recording');
    } catch {
      setMicError('Microphone permission was declined or unavailable. You can still sing along using the external karaoke link.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const deleteRecording = () => {
    if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
    setRecordedAudioUrl(null);
    setRecordingState('idle');
  };

  return (
    <section
      id="chapter-music"
      className="relative w-full bg-[#102D3A] text-[#F8F3E9] py-24 sm:py-32 px-6 sm:px-12 border-t border-[#E8D6B8]/10"
    >
      <div className="mx-auto max-w-6xl space-y-24">
        {/* Music Room Masthead */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="font-mono-meta text-xs text-[#D8A45B]">
                Chapter 07 · Our Little Music Room
              </p>
              <h2 className="mt-3 font-editorial text-4xl sm:text-6xl font-normal text-[#F8F3E9]">
                If our memories had a soundtrack.
              </h2>
            </div>

            <div className="inline-flex border border-[#E8D6B8]/20 bg-[#091521] p-1 self-start">
              <button
                type="button"
                onClick={() => setFilterFavorites(false)}
                className={`px-4 py-1.5 text-xs cursor-pointer transition-colors ${
                  !filterFavorites ? 'bg-[#D8A45B] text-[#091521] font-medium' : 'text-[#AEBCC5]'
                }`}
              >
                All tracks ({SOUNDTRACK_SONGS.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterFavorites(true)}
                className={`px-4 py-1.5 text-xs cursor-pointer transition-colors ${
                  filterFavorites ? 'bg-[#D8A45B] text-[#091521] font-medium' : 'text-[#AEBCC5]'
                }`}
              >
                Favourites ({favoriteSongIds.length})
              </button>
            </div>
          </div>

          {/* Horizontal Album Carousel */}
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
            {visibleSongs.map((song) => {
              const isSelected = selectedSong.id === song.id;
              const isFav = favoriteSongIds.includes(song.id);
              return (
                <article
                  key={song.id}
                  className={`snap-start shrink-0 w-[260px] sm:w-[290px] border transition-colors ${
                    isSelected
                      ? 'border-[#D8A45B] bg-[#091521]/90'
                      : 'border-[#E8D6B8]/15 bg-[#091521]/55 hover:border-[#E8D6B8]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedSong(song)}
                    className="block w-full text-left cursor-pointer group"
                  >
                    <div className="overflow-hidden">
                      <div className="transition-transform duration-500 group-hover:scale-105">
                        <AlbumArtCover
                          title={song.title}
                          artist={song.artist}
                          theme={song.moodTheme}
                          customCoverPath={song.customCoverPath}
                        />
                      </div>
                    </div>
                  </button>

                  <div className="p-4 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-mono-meta text-[10px] text-[#D8A45B] truncate">
                        {song.yearOrEra}
                      </p>
                      <p className="text-sm font-medium text-[#F8F3E9] truncate">
                        {song.title}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavoriteSong(song.id)}
                      aria-label={isFav ? 'Remove from favourites' : 'Save to favourites'}
                      className="p-2 text-[#C98F89] hover:scale-110 transition-transform cursor-pointer shrink-0"
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Selected Song Editorial Note & Authorized Streaming Link */}
          <div className="mt-8 border border-[#E8D6B8]/20 bg-[#091521]/75 p-6 sm:p-8 grid gap-8 md:grid-cols-[200px_1fr] items-center">
            <AlbumArtCover
              title={selectedSong.title}
              artist={selectedSong.artist}
              theme={selectedSong.moodTheme}
              customCoverPath={selectedSong.customCoverPath}
            />
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-meta text-[#D8A45B]">
                <Disc3 className="h-4 w-4" aria-hidden="true" />
                <span>{selectedSong.yearOrEra}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedSong.artist}</span>
              </div>
              <h3 className="font-editorial text-3xl text-[#F8F3E9]">{selectedSong.title}</h3>
              <p className="text-sm leading-relaxed text-[#E8D6B8]/90">
                {selectedSong.personalNote}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={selectedSong.streamingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#D8A45B] px-5 py-2.5 text-xs font-medium text-[#091521] hover:opacity-90"
                >
                  <span>Listen on {selectedSong.streamingPlatform}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => toggleFavoriteSong(selectedSong.id)}
                  className="inline-flex items-center gap-2 border border-[#E8D6B8]/25 px-4 py-2.5 text-xs text-[#E8D6B8] cursor-pointer"
                >
                  <Heart
                    className={`h-3.5 w-3.5 text-[#C98F89] ${
                      favoriteSongIds.includes(selectedSong.id) ? 'fill-current' : ''
                    }`}
                  />
                  <span>
                    {favoriteSongIds.includes(selectedSong.id) ? 'In favourites' : 'Save favourite'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Karaoke Corner */}
        <div className="border-t border-[#E8D6B8]/15 pt-16">
          <div className="max-w-2xl mb-10">
            <p className="font-mono-meta text-xs text-[#C98F89]">Karaoke Corner</p>
            <h3 className="mt-2 font-editorial text-3xl sm:text-5xl text-[#F8F3E9]">
              Let's sing this one together.
            </h3>
            <p className="mt-2 text-sm text-[#AEBCC5]">
              Pick a track, open its official karaoke video, or record a quick voice take locally on your device. Recordings stay strictly in your browser until you delete them.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              {KARAOKE_TRACKS.map((track) => {
                const active = track.id === activeKaraoke.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setSelectedKaraokeId(track.id)}
                    className={`w-full text-left border p-5 transition-colors cursor-pointer ${
                      active
                        ? 'border-[#D8A45B] bg-[#091521]/85'
                        : 'border-[#E8D6B8]/15 bg-[#091521]/45 hover:border-[#E8D6B8]/40'
                    }`}
                  >
                    <p className="font-mono-meta text-xs text-[#D8A45B]">{track.artist}</p>
                    <h4 className="mt-1 font-editorial text-2xl text-[#F8F3E9]">{track.title}</h4>
                    <p className="mt-2 text-xs text-[#AEBCC5]">{track.duetNote}</p>
                  </button>
                );
              })}

              <a
                href={activeKaraoke.karaokeVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#D8A45B]/50 px-5 py-3 text-xs font-medium text-[#E8D6B8] hover:bg-[#D8A45B] hover:text-[#091521] transition-colors"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Open Karaoke Video Externally</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Microphone + Local Recording Interface */}
            <div className="border border-[#E8D6B8]/20 bg-[#091521]/80 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <p className="font-mono-meta text-xs text-[#AEBCC5]">
                  Permitted Cue Lines · {activeKaraoke.title}
                </p>
                <div className="mt-4 space-y-2 border-t border-[#E8D6B8]/10 pt-4">
                  {(activeKaraoke.lyricsLines || []).map((line, i) => (
                    <p key={i} className="font-editorial text-xl text-[#E8D6B8]/90 italic">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E8D6B8]/15 pt-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                        recordingState === 'recording'
                          ? 'border-[#C98F89] bg-[#C98F89]/25 text-[#C98F89]'
                          : 'border-[#D8A45B]/40 text-[#D8A45B]'
                      }`}
                    >
                      <Mic className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#F8F3E9]">
                        {recordingState === 'recording'
                          ? 'Recording via microphone...'
                          : recordingState === 'recorded'
                            ? 'Take saved locally'
                            : 'Local Duet Recorder'}
                      </p>
                      <p className="text-xs text-[#AEBCC5]">
                        Never uploaded anywhere · Explicit permission required
                      </p>
                    </div>
                  </div>

                  {recordingState !== 'recording' ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="inline-flex items-center gap-2 bg-[#D8A45B] px-4 py-2 text-xs font-medium text-[#091521] hover:opacity-90 cursor-pointer"
                    >
                      <Mic className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Start recording</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="inline-flex items-center gap-2 bg-[#C98F89] px-4 py-2 text-xs font-medium text-[#091521] hover:opacity-90 cursor-pointer"
                    >
                      <Square className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Stop</span>
                    </button>
                  )}
                </div>

                {micError ? <p className="text-xs text-[#C98F89]">{micError}</p> : null}

                {recordedAudioUrl ? (
                  <div className="flex flex-wrap items-center gap-3 bg-[#102D3A]/50 p-3">
                    <audio controls src={recordedAudioUrl} className="flex-1 h-9" />
                    <button
                      type="button"
                      onClick={deleteRecording}
                      aria-label="Delete local recording"
                      className="inline-flex items-center gap-1 border border-[#C98F89]/40 px-3 py-1.5 text-xs text-[#C98F89] hover:bg-[#C98F89] hover:text-[#091521] cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Delete</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
