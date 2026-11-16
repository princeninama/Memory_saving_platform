import { KaraokeTrack, SongItem, VoiceRecording } from '../types/universe';
import { SCENE_ASSETS } from './siteContent';

export const VOICE_RECORDINGS: VoiceRecording[] = [
  {
    id: 'voice-her-1',
    perspective: 'her',
    title: 'Voice Note #1 — Through Your Eyes (Editable)',
    date: 'Add recording date',
    durationLabel: '--:--',
    audioPath: '/api/media/audio/her/voice-1.mp3',
    visualPath: SCENE_ASSETS.beachGoldenHour,
    transcript:
      '[Optional transcript] Place her real recording at private-media/audio/her/voice-1.mp3 or use "Load local audio file" below to test immediately.',
    collectionTag: 'Things our voices should never lose',
  },
  {
    id: 'voice-her-2',
    perspective: 'her',
    title: 'Voice Note #2 — Late Night Laugh (Editable)',
    date: 'Add recording date',
    durationLabel: '--:--',
    audioPath: '/api/media/audio/her/voice-2.mp3',
    visualPath: SCENE_ASSETS.delhiWinterEvening,
    transcript:
      '[Optional transcript] Add the words or context of this recording in src/data/voicesAndMusic.ts.',
    collectionTag: 'Things our voices should never lose',
  },
  {
    id: 'voice-mine-1',
    perspective: 'mine',
    title: 'Voice Note #1 — Through My Eyes (Editable)',
    date: 'Add recording date',
    durationLabel: '--:--',
    audioPath: '/api/media/audio/mine/voice-1.mp3',
    visualPath: SCENE_ASSETS.tungnathSunrise,
    transcript:
      '[Optional transcript] Place your real recording at private-media/audio/mine/voice-1.mp3 or test with a local audio file.',
    collectionTag: 'Things our voices should never lose',
  },
  {
    id: 'voice-mine-2',
    perspective: 'mine',
    title: 'Voice Note #2 — After the Trip (Editable)',
    date: 'Add recording date',
    durationLabel: '--:--',
    audioPath: '/api/media/audio/mine/voice-2.mp3',
    visualPath: SCENE_ASSETS.travelMountainRoad,
    transcript:
      '[Optional transcript] Explain what you wanted her to remember whenever she replays this.',
    collectionTag: 'Things our voices should never lose',
  },
];

export const SOUNDTRACK_SONGS: SongItem[] = [
  {
    id: 'song-1',
    title: 'Track 01 — Coastal Evening (Editable Song)',
    artist: 'Editable Artist Name',
    personalNote:
      '[Editable song story] Replace with the real song title, artist, and why this melody belongs to your shoreline memories.',
    moodTheme: 'coastal',
    streamingUrl: 'https://open.spotify.com/',
    streamingPlatform: 'Spotify',
    yearOrEra: 'Beach & Golden Hour',
  },
  {
    id: 'song-2',
    title: 'Track 02 — Campus Rain (Editable Song)',
    artist: 'Editable Artist Name',
    personalNote:
      '[Editable song story] The song you always played walking back across the courtyard.',
    moodTheme: 'sepia',
    streamingUrl: 'https://www.youtube.com/',
    streamingPlatform: 'YouTube',
    yearOrEra: 'College Days',
  },
  {
    id: 'song-3',
    title: 'Track 03 — Winter Metro Lights (Editable Song)',
    artist: 'Editable Artist Name',
    personalNote:
      '[Editable song story] Headphones shared on a winter evening in Delhi.',
    moodTheme: 'twilight',
    streamingUrl: 'https://open.spotify.com/',
    streamingPlatform: 'Spotify',
    yearOrEra: 'Delhi Winters',
  },
  {
    id: 'song-4',
    title: 'Track 04 — Winding Pine Road (Editable Song)',
    artist: 'Editable Artist Name',
    personalNote:
      '[Editable song story] Played on repeat while watching the mist roll across the hills.',
    moodTheme: 'forest',
    streamingUrl: 'https://www.youtube.com/',
    streamingPlatform: 'YouTube',
    yearOrEra: 'Ghumi Ghumi',
  },
  {
    id: 'song-5',
    title: 'Track 05 — Above the Clouds (Editable Song)',
    artist: 'Editable Artist Name',
    personalNote:
      '[Editable song story] Quiet instrumentals for the night sky at Hampta Pass.',
    moodTheme: 'midnight',
    streamingUrl: 'https://open.spotify.com/',
    streamingPlatform: 'Spotify',
    yearOrEra: 'Mountain Night',
  },
];

export const KARAOKE_TRACKS: KaraokeTrack[] = [
  {
    id: 'kar-1',
    title: 'Our Duet Song #1 (Editable)',
    artist: 'Add Artist',
    karaokeVideoUrl: 'https://www.youtube.com/results?search_query=acoustic+karaoke',
    duetNote:
      '[Editable karaoke note] Add your real song title and legitimate YouTube karaoke link in src/data/voicesAndMusic.ts.',
    lyricsLines: [
      '[Add permitted personal or licensed lyric lines here]',
      '[Line 2 — editable in src/data/voicesAndMusic.ts]',
      '[Line 3 — or open the linked karaoke video externally]',
    ],
  },
  {
    id: 'kar-2',
    title: 'Our Road Trip Singalong (Editable)',
    artist: 'Add Artist',
    karaokeVideoUrl: 'https://www.youtube.com/results?search_query=karaoke+version',
    duetNote:
      '[Editable karaoke note] The chorus we always sang off-key in the car or on the train.',
    lyricsLines: [
      '[Add permitted lyric cue 1]',
      '[Add permitted lyric cue 2]',
    ],
  },
];
