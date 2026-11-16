import { MountainPhoto, PersonalStory, StarMemory } from '../types/universe';
import { SCENE_ASSETS } from './siteContent';

export const PERSONAL_STORIES: PersonalStory[] = [
  {
    id: 'story-1',
    title: 'The Quiet Way Things Stay (Editable Title)',
    paragraph:
      '[Editable personal story] Replace this paragraph in src/data/mountains.ts with your own honest words about a moment you never want to forget.',
    date: 'Editable date',
    location: 'Editable place',
    imagePath: '/api/media/images/college/corridor-1.jpg',
    fallbackScene: SCENE_ASSETS.collegeCorridor,
    voicePath: '/api/media/audio/mine/story-1.mp3',
    isPlaceholderSlot: true,
  },
  {
    id: 'story-2',
    title: 'A Conversation That Changed the Evening (Editable)',
    paragraph:
      '[Editable personal story] Add the actual words, setting, and feeling of a moment that stayed long after the night ended.',
    date: 'Editable date',
    location: 'Editable place',
    imagePath: '/api/media/images/delhi/winter-walk.jpg',
    fallbackScene: SCENE_ASSETS.delhiWinterEvening,
    voicePath: '/api/media/audio/her/story-2.mp3',
    isPlaceholderSlot: true,
  },
  {
    id: 'story-3',
    title: 'Looking Back from the Ridge (Editable)',
    paragraph:
      '[Editable personal story] Pair this spread with a video or mountain photograph and an optional voice narration.',
    date: 'Editable date',
    location: 'Himalayas',
    imagePath: '/api/media/images/mountains/ridge-story.jpg',
    fallbackScene: SCENE_ASSETS.tungnathSunrise,
    isPlaceholderSlot: true,
  },
];

export const HAMPTA_STARS: StarMemory[] = [
  {
    id: 'star-1',
    label: 'North Ridge Light',
    x: 20,
    y: 28,
    magnitude: 'bright',
    title: 'First Campfire Night (Editable)',
    note: '[Editable star memory] Write what it felt like stepping out of the tent and looking straight up.',
    date: 'Editable date',
    imagePath: '/api/media/images/mountains/hampta-star-1.jpg',
  },
  {
    id: 'star-2',
    label: 'Silver River Star',
    x: 41,
    y: 19,
    magnitude: 'constellation',
    title: 'Silence Above the Treeline (Editable)',
    note: '[Editable star memory] Connect a voice note or photograph taken under the cold mountain sky.',
    date: 'Editable date',
    audioPath: '/api/media/audio/mine/hampta-sky.mp3',
    treasureId: 'treasure-5',
  },
  {
    id: 'star-3',
    label: 'Pass Horizon',
    x: 63,
    y: 34,
    magnitude: 'bright',
    title: 'The Cold Wind & Warm Thermos (Editable)',
    note: '[Editable star memory] Add a detail from Hampta Pass that only the two of you remember.',
    date: 'Editable date',
  },
  {
    id: 'star-4',
    label: 'Midnight Drift',
    x: 78,
    y: 22,
    magnitude: 'medium',
    title: 'Wishing Without Saying It Aloud (Editable)',
    note: '[Editable star memory] Every star in HAMPTA_STARS is mapped explicitly to a real memory entry.',
    date: 'Editable date',
  },
  {
    id: 'star-5',
    label: 'Dawn Approach',
    x: 52,
    y: 48,
    magnitude: 'medium',
    title: 'Packing Up Before First Light (Editable)',
    note: '[Editable star memory] Add the story of the early morning climb.',
    date: 'Editable date',
  },
];

export const TUNGNATH_PHOTOS: MountainPhoto[] = [
  {
    id: 'tung-1',
    title: 'First Light Over the Snowline',
    location: 'Tungnath Ridge (Editable sub-location)',
    date: 'Editable date',
    caption: 'When the indigo sky surrendered to gold.',
    memoryNote:
      '[Editable mountain memory] Replace imagePath with /api/media/images/mountains/tungnath-1.jpg to display your real sunrise photograph.',
    imagePath: SCENE_ASSETS.tungnathSunrise,
    isMonochrome: false,
    layout: 'fullscreen',
  },
  {
    id: 'tung-2',
    title: 'Shadow & Pine Mist (Monochrome)',
    location: 'Trail Ascent',
    date: 'Editable date',
    caption: 'Black and white preserves the quietness of the climb.',
    memoryNote:
      '[Editable mountain memory] Rendered in monochrome editorial treatment — upload your B&W mountain photograph here.',
    imagePath: SCENE_ASSETS.travelMountainRoad,
    isMonochrome: true,
    layout: 'editorial-left',
  },
  {
    id: 'tung-3',
    title: 'Above the Sea of Clouds',
    location: 'Chandrashila Viewpoint (Editable)',
    date: 'Editable date',
    caption: 'After every long night, there is a sunrise.',
    memoryNote:
      '[Editable mountain memory] Describe standing above the clouds and watching the peaks catch fire.',
    imagePath: SCENE_ASSETS.tungnathSunrise,
    isMonochrome: false,
    layout: 'editorial-right',
  },
];
