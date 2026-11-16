export type ChapterId =
  | 'beach'
  | 'smile'
  | 'destinations'
  | 'college'
  | 'travel'
  | 'delhi'
  | 'stories'
  | 'mountains'
  | 'voices'
  | 'music'
  | 'extras'
  | 'letter';

export type DestinationWorldId = 'college' | 'travel' | 'delhi';

export type MemoryMediaType = 'photo' | 'video' | 'note' | 'audio';

export interface MemoryItem {
  id: string;
  title: string;
  description: string;
  imagePath?: string;
  fallbackScene?: string;
  videoPath?: string;
  audioPath?: string;
  date?: string;
  location?: string;
  chapter: DestinationWorldId | 'mountains' | 'stories' | 'beach';
  memoryType: MemoryMediaType;
  frameStyle?: 'editorial' | 'polaroid' | 'film' | 'fullscreen';
  handwrittenNote?: string;
  revealInteraction?: 'scratch' | 'envelope' | 'standard';
  scratchThreshold?: number;
  relatedMemoryIds?: string[];
  isPlaceholderSlot?: boolean;
}

export interface EnvelopeNoteItem {
  id: string;
  promptLabel: string;
  message: string;
  date?: string;
  location?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  location?: string;
  summary: string;
  mediaPath?: string;
  audioPath?: string;
  videoPath?: string;
  isPlaceholderSlot?: boolean;
}

export interface TravelLocation {
  id: string;
  name: string;
  regionLabel: string;
  /** Relative visual map position (0-100%) on the illustrated route canvas — NOT GPS coordinates */
  mapX: number;
  mapY: number;
  date?: string;
  story: string;
  caption: string;
  coverImage?: string;
  fallbackScene: string;
  videoPath?: string;
  yourEyesMedia: {
    imagePath?: string;
    videoPath?: string;
    caption: string;
    note: string;
  };
  myEyesMedia: {
    imagePath?: string;
    videoPath?: string;
    caption: string;
    note: string;
  };
  diaryCategory: 'transport' | 'food' | 'funny' | 'landscape' | 'revisit';
}

export interface DelhiFragment {
  id: string;
  stationName: string;
  lineColor: 'yellow' | 'blue' | 'violet' | 'magenta';
  title: string;
  fragmentType: MemoryMediaType;
  content: string;
  date?: string;
  mediaPath?: string;
  fallbackScene?: string;
  audioPath?: string;
  mapX: number;
  mapY: number;
}

export interface PersonalStory {
  id: string;
  title: string;
  paragraph: string;
  date?: string;
  location?: string;
  imagePath?: string;
  fallbackScene: string;
  videoPath?: string;
  voicePath?: string;
  isPlaceholderSlot?: boolean;
}

export interface StarMemory {
  id: string;
  label: string;
  /** Position in the Hampta Pass sky canvas (percentage) */
  x: number;
  y: number;
  magnitude: 'bright' | 'medium' | 'constellation';
  title: string;
  note: string;
  date?: string;
  imagePath?: string;
  audioPath?: string;
  treasureId?: string;
}

export interface MountainPhoto {
  id: string;
  title: string;
  location: string;
  date?: string;
  caption: string;
  memoryNote: string;
  imagePath: string;
  isMonochrome?: boolean;
  layout?: 'fullscreen' | 'editorial-left' | 'editorial-right';
}

export interface VoiceRecording {
  id: string;
  perspective: 'her' | 'mine';
  title: string;
  date?: string;
  durationLabel?: string;
  audioPath: string;
  visualPath?: string;
  transcript?: string;
  collectionTag?: string;
}

export type AlbumMoodTheme = 'coastal' | 'twilight' | 'sepia' | 'forest' | 'midnight';

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  personalNote: string;
  moodTheme: AlbumMoodTheme;
  customCoverPath?: string;
  streamingUrl: string;
  streamingPlatform: 'Spotify' | 'YouTube' | 'Link';
  embedUrl?: string;
  yearOrEra?: string;
}

export interface KaraokeTrack {
  id: string;
  title: string;
  artist: string;
  karaokeVideoUrl: string;
  duetNote: string;
  /** Supplied permitted lyrics lines only */
  lyricsLines?: string[];
}

export interface TreasureItem {
  id: string;
  index: number;
  name: string;
  chapterLocation: string;
  clue: string;
  rewardTitle: string;
  rewardMessage: string;
  rewardImagePath?: string;
  rewardAudioPath?: string;
}

export interface TimeCapsuleLetter {
  id: string;
  title: string;
  subtitle: string;
  unlockDate?: string; // ISO YYYY-MM-DD; omit for open-now capsule
  salutation: string;
  body: string[];
  closing: string;
}

export interface DictionaryEntry {
  id: string;
  term: string;
  phoneticOrTag: string;
  meaning: string;
  memoryStory: string;
  date?: string;
}

export interface FutureDestination {
  id: string;
  placeName: string;
  region: string;
  reason: string;
  note?: string;
  status: 'not-yet-visited' | 'visited';
  imagePath: string;
}
