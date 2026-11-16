import {
  DelhiFragment,
  EnvelopeNoteItem,
  MemoryItem,
  TimelineEvent,
  TravelLocation,
} from '../types/universe';
import { SCENE_ASSETS } from './siteContent';

export const COLLEGE_MEMORIES: MemoryItem[] = [
  {
    id: 'col-1',
    title: 'Afternoon light across the stone corridor',
    description:
      '[Editable memory caption] Replace imagePath with /api/media/images/college/corridor-1.jpg once your campus photo is added.',
    imagePath: '/api/media/images/college/corridor-1.jpg',
    fallbackScene: SCENE_ASSETS.collegeCorridor,
    date: 'Editable date',
    location: 'Campus Courtyard',
    chapter: 'college',
    memoryType: 'photo',
    frameStyle: 'editorial',
    handwrittenNote: 'We walked past this bench a hundred times.',
    isPlaceholderSlot: true,
  },
  {
    id: 'col-2',
    title: 'Between lectures on the steps',
    description:
      '[Editable memory caption] A candid Polaroid frame ready for your real college photograph.',
    imagePath: '/api/media/images/college/polaroid-1.jpg',
    fallbackScene: SCENE_ASSETS.collegeCorridor,
    date: 'Editable date',
    location: 'Main Building',
    chapter: 'college',
    memoryType: 'photo',
    frameStyle: 'polaroid',
    handwrittenNote: 'Notes on borrowed paper.',
    isPlaceholderSlot: true,
  },
  {
    id: 'col-3',
    title: '35mm frame from the lawn',
    description:
      '[Editable memory caption] Film-bordered memory slot — connect your photo at private-media/images/college/film-1.jpg.',
    imagePath: '/api/media/images/college/film-1.jpg',
    fallbackScene: SCENE_ASSETS.beachGoldenHour,
    date: 'Editable date',
    location: 'College Lawn',
    chapter: 'college',
    memoryType: 'photo',
    frameStyle: 'film',
    handwrittenNote: 'Late afternoon sun before going home.',
    isPlaceholderSlot: true,
  },
  {
    id: 'col-4',
    title: 'The afternoon that refused to end',
    description:
      '[Editable memory caption] Full-width editorial slot for your favorite group or candid campus frame.',
    imagePath: '/api/media/images/college/fullscreen-1.jpg',
    fallbackScene: SCENE_ASSETS.collegeCorridor,
    date: 'Editable date',
    location: 'Library Steps',
    chapter: 'college',
    memoryType: 'photo',
    frameStyle: 'fullscreen',
    handwrittenNote: 'One of those ordinary days that stayed.',
    isPlaceholderSlot: true,
  },
];

export const COLLEGE_SCRATCH_CARDS: MemoryItem[] = [
  {
    id: 'scratch-1',
    title: 'Hidden Polaroid #1',
    description:
      '[Editable revealed caption] Replace with your real hidden photo and personal note in src/data/memories.ts.',
    imagePath: '/api/media/images/college/scratch-1.jpg',
    fallbackScene: SCENE_ASSETS.collegeCorridor,
    audioPath: '/api/media/audio/mine/college-scratch-1.mp3',
    date: 'Editable date',
    location: 'Campus Canteen',
    chapter: 'college',
    memoryType: 'photo',
    revealInteraction: 'scratch',
    scratchThreshold: 48,
    handwrittenNote: 'There is something hidden underneath.',
  },
  {
    id: 'scratch-2',
    title: 'Hidden Polaroid #2',
    description:
      '[Editable revealed caption] Another sealed memory waiting beneath the paper grain.',
    imagePath: '/api/media/images/college/scratch-2.jpg',
    fallbackScene: SCENE_ASSETS.delhiWinterEvening,
    audioPath: '/api/media/audio/her/college-scratch-2.mp3',
    date: 'Editable date',
    location: 'Auditorium Exit',
    chapter: 'college',
    memoryType: 'photo',
    revealInteraction: 'scratch',
    scratchThreshold: 48,
    handwrittenNote: 'Scratch gently to uncover.',
  },
];

export const COLLEGE_ENVELOPES: EnvelopeNoteItem[] = [
  {
    id: 'env-1',
    promptLabel: 'Remember this day?',
    message:
      '[Editable note] Write what happened on that random afternoon between classes — editable in src/data/memories.ts.',
    date: 'Editable date',
  },
  {
    id: 'env-2',
    promptLabel: 'I still laugh when I think about this.',
    message:
      '[Editable note] Put an inside story from campus that still makes both of you smile.',
    date: 'Editable date',
  },
  {
    id: 'env-3',
    promptLabel: 'One of those completely random days.',
    message:
      '[Editable note] A small conversation or spontaneous detour after college.',
    date: 'Editable date',
  },
  {
    id: 'env-4',
    promptLabel: "We didn't know this would become a memory.",
    message:
      '[Editable note] Something quiet that felt routine at the time, until time passed.',
    date: 'Editable date',
  },
];

export const COLLEGE_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl-1',
    title: 'First Chapter on Campus (Editable)',
    date: 'Add actual date',
    location: 'Add actual place',
    summary:
      'Replace this entry in src/data/memories.ts with an actual date, photograph, clip, or voice note.',
    mediaPath: '/api/media/images/college/corridor-1.jpg',
    isPlaceholderSlot: true,
  },
  {
    id: 'tl-2',
    title: 'Rainy Afternoon & Chai (Editable)',
    date: 'Add actual date',
    location: 'Add actual place',
    summary:
      'Connect a real voice recording or video clip when ready by setting audioPath or videoPath.',
    audioPath: '/api/media/audio/her/timeline-2.mp3',
    isPlaceholderSlot: true,
  },
  {
    id: 'tl-3',
    title: 'Last Weeks Before Farewell (Editable)',
    date: 'Add actual date',
    location: 'Add actual place',
    summary:
      'A timeline anchor you can expand with as many real dates and memories as you like.',
    mediaPath: '/api/media/images/college/film-1.jpg',
    isPlaceholderSlot: true,
  },
];

export const TRAVEL_LOCATIONS: TravelLocation[] = [
  {
    id: 'loc-1',
    name: 'First Stop on the Route (Editable)',
    regionLabel: 'Set real place name in src/data/memories.ts',
    mapX: 22,
    mapY: 64,
    date: 'Add actual date',
    story:
      '[Editable travel story] Describe the train or road journey here. No GPS coordinates are fabricated — map pins represent editorial journey stops.',
    caption: 'Early departure before the highway woke up.',
    coverImage: '/api/media/images/travel/stop-1.jpg',
    fallbackScene: SCENE_ASSETS.travelMountainRoad,
    videoPath: '/api/media/videos/travel/stop-1.mp4',
    yourEyesMedia: {
      imagePath: '/api/media/images/travel/stop-1-her.jpg',
      caption: 'Through your eyes — upload her photo at private-media/images/travel/stop-1-her.jpg',
      note: 'What you noticed first when we arrived.',
    },
    myEyesMedia: {
      imagePath: '/api/media/images/travel/stop-1-mine.jpg',
      caption: 'Through my eyes — upload your photo at private-media/images/travel/stop-1-mine.jpg',
      note: 'How the same moment looked from where I stood.',
    },
    diaryCategory: 'transport',
  },
  {
    id: 'loc-2',
    name: 'Roadside Chai & Mist (Editable)',
    regionLabel: 'Set real place name',
    mapX: 46,
    mapY: 46,
    date: 'Add actual date',
    story:
      '[Editable food & detour story] An unexpected stop along the route where warm food tasted ten times better because of the cold air.',
    caption: 'Steam rising against the pine valley.',
    coverImage: '/api/media/images/travel/stop-2.jpg',
    fallbackScene: SCENE_ASSETS.travelMountainRoad,
    yourEyesMedia: {
      imagePath: '/api/media/images/travel/stop-2-her.jpg',
      caption: 'Through your eyes — editable perspective slot',
      note: 'Your frame from the stop.',
    },
    myEyesMedia: {
      imagePath: '/api/media/images/travel/stop-2-mine.jpg',
      caption: 'Through my eyes — editable perspective slot',
      note: 'My frame from across the table.',
    },
    diaryCategory: 'food',
  },
  {
    id: 'loc-3',
    name: 'Hampta Pass Valley (Trail Chapter)',
    regionLabel: 'Himalayan Trail',
    mapX: 68,
    mapY: 30,
    date: 'Add actual date',
    story:
      '[Editable trek memory] Cold wind, endless sky, and the silence that only high trails have.',
    caption: 'Where the sky felt closer than the road behind us.',
    coverImage: '/api/media/images/mountains/hampta-1.jpg',
    fallbackScene: SCENE_ASSETS.tungnathSunrise,
    yourEyesMedia: {
      imagePath: '/api/media/images/mountains/hampta-her.jpg',
      caption: 'Through your eyes — Hampta Pass perspective',
      note: 'Add her mountain frame here.',
    },
    myEyesMedia: {
      imagePath: '/api/media/images/mountains/hampta-mine.jpg',
      caption: 'Through my eyes — Hampta Pass perspective',
      note: 'Add your mountain frame here.',
    },
    diaryCategory: 'landscape',
  },
  {
    id: 'loc-4',
    name: 'Tungnath Ridge (Dawn Chapter)',
    regionLabel: 'High Ridge',
    mapX: 83,
    mapY: 22,
    date: 'Add actual date',
    story:
      '[Editable sunrise memory] Waiting in the dark before the first gold touched the snow peaks.',
    caption: 'A place we promised to remember forever.',
    coverImage: '/api/media/images/mountains/tungnath-1.jpg',
    fallbackScene: SCENE_ASSETS.tungnathSunrise,
    yourEyesMedia: {
      imagePath: '/api/media/images/mountains/tungnath-her.jpg',
      caption: 'Through your eyes — Tungnath dawn',
      note: 'Her photo from the ridge.',
    },
    myEyesMedia: {
      imagePath: '/api/media/images/mountains/tungnath-mine.jpg',
      caption: 'Through my eyes — Tungnath dawn',
      note: 'Your photo from the ridge.',
    },
    diaryCategory: 'revisit',
  },
];

export const TRAVEL_DIARY_NOTES: Record<
  TravelLocation['diaryCategory'],
  { title: string; subtitle: string; entries: { title: string; detail: string }[] }
> = {
  transport: {
    title: 'Transport Memories',
    subtitle: 'Trains, overnight buses, and curved mountain roads',
    entries: [
      {
        title: 'Window Seat Playlist (Editable)',
        detail: 'Add a real note about a train or bus ride in src/data/memories.ts.',
      },
      {
        title: 'Missed Turn Detour (Editable)',
        detail: 'Replace with an actual transport story from your trips.',
      },
    ],
  },
  food: {
    title: 'Favourite Food Memories',
    subtitle: 'Hot plates on cold evenings and roadside tea',
    entries: [
      {
        title: 'Maggi & Ginger Tea on the Climb (Editable)',
        detail: 'Document the dish or cafe you always bring up.',
      },
      {
        title: 'Late-Night Dinner After Arrival (Editable)',
        detail: 'Add the actual place name and what you ordered.',
      },
    ],
  },
  funny: {
    title: 'Funny Incidents',
    subtitle: 'Moments that only make sense if you were there',
    entries: [
      {
        title: 'Inside Incident #1 (Editable)',
        detail: 'Add a real funny moment from your Ghumi Ghumi adventures.',
      },
    ],
  },
  landscape: {
    title: 'Landscape Photographs',
    subtitle: 'Horizons that made both of us stop talking for a minute',
    entries: [
      {
        title: 'Clearing Mist at the Pass (Editable)',
        detail: 'Pair with your high-resolution mountain landscape photograph.',
      },
    ],
  },
  revisit: {
    title: 'Places We Want to Revisit',
    subtitle: 'Destinations that still owe us one more morning',
    entries: [
      {
        title: 'Back to the Quiet Ridge (Editable)',
        detail: 'Note why you want to return here in another season.',
      },
    ],
  },
};

export const DELHI_FRAGMENTS: DelhiFragment[] = [
  {
    id: 'del-1',
    stationName: 'Station 01 · Winter Evening Walk (Editable)',
    lineColor: 'yellow',
    title: 'Fog under warm streetlamps',
    fragmentType: 'photo',
    content:
      '[Editable Delhi memory] Replace stationName and mediaPath in src/data/memories.ts with the real neighborhood or metro stop.',
    date: 'Editable winter date',
    mediaPath: '/api/media/images/delhi/winter-walk.jpg',
    fallbackScene: SCENE_ASSETS.delhiWinterEvening,
    mapX: 24,
    mapY: 36,
  },
  {
    id: 'del-2',
    stationName: 'Station 02 · Cafe Corner (Editable)',
    lineColor: 'blue',
    title: 'Two cups on a wooden table',
    fragmentType: 'note',
    content:
      '[Editable note] Write down a real cafe conversation, a book you talked about, or why this corner felt like yours.',
    date: 'Editable date',
    fallbackScene: SCENE_ASSETS.delhiWinterEvening,
    mapX: 48,
    mapY: 52,
  },
  {
    id: 'del-3',
    stationName: 'Station 03 · Last Metro Home (Editable)',
    lineColor: 'violet',
    title: 'Empty carriage at night',
    fragmentType: 'audio',
    content:
      '[Editable audio fragment] Connect an actual street ambient or voice note at private-media/audio/her/delhi-metro.mp3.',
    date: 'Editable date',
    audioPath: '/api/media/audio/her/delhi-metro.mp3',
    fallbackScene: SCENE_ASSETS.delhiWinterEvening,
    mapX: 66,
    mapY: 41,
  },
  {
    id: 'del-4',
    stationName: 'Station 04 · Market & Street Food (Editable)',
    lineColor: 'magenta',
    title: 'Crowded lanes & sudden laughter',
    fragmentType: 'video',
    content:
      '[Editable clip] Connect a short everyday video clip at private-media/videos/delhi/evening-clip.mp4.',
    date: 'Editable date',
    mediaPath: '/api/media/videos/delhi/evening-clip.mp4',
    fallbackScene: SCENE_ASSETS.delhiWinterEvening,
    mapX: 80,
    mapY: 64,
  },
];
