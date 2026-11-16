export const SCENE_ASSETS = {
  beachGoldenHour: '/src/assets/images/beach_golden_hour_1794854293162.jpg',
  collegeCorridor: '/src/assets/images/college_corridor_editorial_1794854300081.jpg',
  travelMountainRoad: '/src/assets/images/travel_mountain_road_1794854294222.jpg',
  delhiWinterEvening: '/src/assets/images/delhi_winter_evening_1794854295238.jpg',
  tungnathSunrise: '/src/assets/images/tungnath_sunrise_peaks_1794854294957.jpg',
} as const;

export const SITE_CONTENT = {
  brandTitle: 'A Little Place in the Internet',
  opening: {
    headline: 'I reserved a little space on the internet, just for you.',
    subheading: 'Some moments deserve a place where they can live forever.',
    signature: '— With all my heart (edit your name in src/data/siteContent.ts)',
    primaryCta: 'Come, let me show you something.',
    skipIntroLabel: 'Skip intro',
  },
  chapterTwoSmile: {
    kicker: 'Chapter 02 · The First Memory',
    primaryLine: 'Before we go anywhere, I want you to see this moment again.',
    secondaryLine: 'Some things are beautiful even when time stands still.',
    /**
     * Place your actual video at /private-media/videos/intro/her-smile.mp4
     * Served securely at /api/media/videos/intro/her-smile.mp4
     */
    videoPath: '/api/media/videos/intro/her-smile.mp4',
    posterPath: SCENE_ASSETS.beachGoldenHour,
    uploadHint:
      'Add her real video at private-media/videos/intro/her-smile.mp4 (or preview a local video file directly below).',
  },
  destinationsIntro: {
    kicker: 'Chapter 03 · Choose a Memory to Revisit',
    headline: 'Where should we go today?',
    subheading: 'Three little worlds. A thousand memories.',
    worlds: [
      {
        id: 'college' as const,
        title: 'College Life',
        label: 'The days that became stories.',
        handwrittenNote: 'Corridors, sunlit benches, and the days we did not know we would miss.',
        dateDetail: 'Editable era · Campus years',
        image: SCENE_ASSETS.collegeCorridor,
      },
      {
        id: 'travel' as const,
        title: 'Ghumi Ghumi Life',
        label: 'Everywhere felt better with these moments.',
        handwrittenNote: 'Winding roads, unexpected stops, and windows rolled down.',
        dateDetail: 'Editable journeys · On the road',
        image: SCENE_ASSETS.travelMountainRoad,
      },
      {
        id: 'delhi' as const,
        title: 'Delhi Life',
        label: 'A city full of little chapters.',
        handwrittenNote: 'Winter fog, metro rides, and warm cafe lights after dusk.',
        dateDetail: 'Editable chapters · City evenings',
        image: SCENE_ASSETS.delhiWinterEvening,
      },
    ],
  },
  backgroundMusic: {
    trackTitle: 'Golden Hour Waves (Ambient)',
    /** Optional custom ambient MP3 placed at private-media/audio/music/ambient.mp3 */
    audioPath: '/api/media/audio/music/ambient.mp3',
  },
  finalLetter: {
    kicker: 'Final Chapter',
    openingLine: 'Well, we have travelled through a lot of little moments.',
    paragraphs: [
      '[Editable Personal Letter — Replace these paragraphs in src/data/siteContent.ts with your own words.]',
      'Every room in this little corner of the internet was built to hold onto the laughter, the quiet drives, the winter evenings, and the stillness of early mornings in the mountains.',
      'Whenever days feel rushed or loud, you can come back here and walk along this shore at your own pace.',
    ],
    closingLine:
      "I don't know how many more memories we will make, but I wanted to give the ones we already have a little home.",
    signOff: 'Until our next adventure.',
    signature: 'Yours, always (editable signature)',
    restartCta: 'Start our journey again.',
  },
};
