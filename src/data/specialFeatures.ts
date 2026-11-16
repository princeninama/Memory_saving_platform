import {
  DictionaryEntry,
  FutureDestination,
  TimeCapsuleLetter,
  TreasureItem,
} from '../types/universe';
import { SCENE_ASSETS } from './siteContent';

export const TREASURE_ITEMS: TreasureItem[] = [
  {
    id: 'treasure-1',
    index: 1,
    name: 'The Tide-Line Seashell',
    chapterLocation: 'Chapter 01 · The Beach',
    clue: 'Look quietly near the lower shoreline sand where the waves fade.',
    rewardTitle: 'First Shell Kept',
    rewardMessage:
      '[Editable treasure reward] You noticed the smallest detail on the shore. Replace this message in src/data/specialFeatures.ts.',
    rewardImagePath: SCENE_ASSETS.beachGoldenHour,
  },
  {
    id: 'treasure-2',
    index: 2,
    name: 'Tucked Margin Photograph',
    chapterLocation: 'College Life · Scrapbook Corner',
    clue: 'A corner of a page in the College scrapbook hides something tucked behind it.',
    rewardTitle: 'Behind the Margins',
    rewardMessage:
      '[Editable treasure reward] Some of the best college photos never made it to the main album.',
    rewardImagePath: SCENE_ASSETS.collegeCorridor,
  },
  {
    id: 'treasure-3',
    index: 3,
    name: 'Traveller’s Brass Compass',
    chapterLocation: 'Ghumi Ghumi Life · Travel Map',
    clue: 'Resting quietly in the margin of the Ghumi Ghumi route map.',
    rewardTitle: 'Detours We Loved',
    rewardMessage:
      '[Editable treasure reward] Even when we took the wrong turn, we somehow ended up somewhere better.',
    rewardImagePath: SCENE_ASSETS.travelMountainRoad,
  },
  {
    id: 'treasure-4',
    index: 4,
    name: 'Paper Metro Token',
    chapterLocation: 'Delhi Life · City Map',
    clue: 'Check beside the winter evening metro line in Delhi Life.',
    rewardTitle: 'One More Station',
    rewardMessage:
      '[Editable treasure reward] For all the times we stayed on the platform talking a little longer.',
    rewardImagePath: SCENE_ASSETS.delhiWinterEvening,
  },
  {
    id: 'treasure-5',
    index: 5,
    name: 'Silver River Star',
    chapterLocation: 'Mountain Journey · Hampta Pass Sky',
    clue: 'Explore the bright constellation stars in the Hampta Pass night sky.',
    rewardTitle: 'Starlight Promise',
    rewardMessage:
      '[Editable treasure reward] Under that cold high-altitude sky, time moved differently.',
    rewardImagePath: SCENE_ASSETS.tungnathSunrise,
  },
  {
    id: 'treasure-6',
    index: 6,
    name: 'First Dawn Ray',
    chapterLocation: 'Mountain Journey · Tungnath Sunrise',
    clue: 'Look closely along the horizon ridge during the Tungnath sunrise.',
    rewardTitle: 'Morning Warmth',
    rewardMessage:
      '[Editable treasure reward] Watching dark peaks turn gold together.',
    rewardImagePath: SCENE_ASSETS.tungnathSunrise,
  },
  {
    id: 'treasure-7',
    index: 7,
    name: 'Crimson Wax Seal',
    chapterLocation: 'The Time Capsule',
    clue: 'Examine the wax seal beside the time capsule letters.',
    rewardTitle: 'Kept for Later',
    rewardMessage:
      '[Editable treasure reward] Everything sealed here was meant to be found by you.',
  },
];

export const FINAL_SECRET_TREASURE = {
  title: 'All Seven Little Things Found',
  subtitle: 'You explored every corner of this place.',
  letter:
    '[Editable Final Secret Reward] Write a special hidden note, attach a secret video path, or drop a celebratory memory here for when she finds all 7/7 treasures.',
  secretAudioPath: '/api/media/audio/mine/secret-reward.mp3',
};

export const TIME_CAPSULES: TimeCapsuleLetter[] = [
  {
    id: 'capsule-now',
    title: 'Open this when you miss these days.',
    subtitle: 'Ready whenever you need it',
    salutation: 'Hey you,',
    body: [
      '[Editable letter] Write what you want her to read on a quiet night when distance or busyness makes old days feel far away.',
      'Remember that every photograph, voice note, and song in this space is yours to return to whenever you want.',
    ],
    closing: 'Always in your corner.',
  },
  {
    id: 'capsule-anniversary',
    title: 'A Capsule Sealed for Later',
    subtitle: 'Unlocks on a configured future date',
    unlockDate: '2027-01-01',
    salutation: 'From the past to the future,',
    body: [
      '[Editable future letter] This text stays hidden until the real calendar date reaches unlockDate (configured in src/data/specialFeatures.ts).',
    ],
    closing: 'Still cheering for us.',
  },
];

export const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  {
    id: 'dict-1',
    term: 'Ghumi Ghumi',
    phoneticOrTag: 'Noun / Verb · Travel Code',
    meaning: 'Any spontaneous plan to leave town, wander, or take the longer road.',
    memoryStory:
      '[Editable story] Replace with the origin of how this phrase became part of your vocabulary.',
    date: 'Editable date',
  },
  {
    id: 'dict-2',
    term: '[Editable Inside Joke #2]',
    phoneticOrTag: 'Phrase · College Era',
    meaning: 'Add a nickname or funny expression only the two of you understand.',
    memoryStory:
      '[Editable story] Explain the exact incident that started it.',
    date: 'Editable date',
  },
  {
    id: 'dict-3',
    term: '[Editable Expression #3]',
    phoneticOrTag: 'Conversation · Late Night',
    meaning: 'A line from an unforgettable conversation worth keeping forever.',
    memoryStory:
      '[Editable story] Write the brief context behind why this stayed.',
    date: 'Editable date',
  },
  {
    id: 'dict-4',
    term: '[Editable Nickname #4]',
    phoneticOrTag: 'Name · Everyday',
    meaning: 'A gentle or funny name with a story attached.',
    memoryStory:
      '[Editable story] Add the memory connected to this name.',
    date: 'Editable date',
  },
];

export const FUTURE_DESTINATIONS: FutureDestination[] = [
  {
    id: 'fut-1',
    placeName: 'A Quiet Coastal Town at Dawn (Editable)',
    region: 'By the Sea',
    reason: 'To walk along the shore with no schedule and listen to waves before sunrise.',
    note: 'Replace with a real place on your shared wishlist.',
    status: 'not-yet-visited',
    imagePath: SCENE_ASSETS.beachGoldenHour,
  },
  {
    id: 'fut-2',
    placeName: 'A Winter Cabin in the High Pines (Editable)',
    region: 'Northern Hills',
    reason: 'Snow outside, warm tea inside, and nowhere we have to rush back to.',
    note: 'Add your real destination note here.',
    status: 'not-yet-visited',
    imagePath: SCENE_ASSETS.travelMountainRoad,
  },
  {
    id: 'fut-3',
    placeName: 'A City Known for Night Bookshops & Jazz (Editable)',
    region: 'Elsewhere',
    reason: 'To wander slow streets in winter coats and collect new ordinary days.',
    note: 'Add your real dream destination.',
    status: 'not-yet-visited',
    imagePath: SCENE_ASSETS.delhiWinterEvening,
  },
];
