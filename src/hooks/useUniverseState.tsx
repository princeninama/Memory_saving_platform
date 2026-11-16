import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ChapterId, DestinationWorldId, MemoryItem } from '../types/universe';
import { COLLEGE_MEMORIES, COLLEGE_SCRATCH_CARDS, DELHI_FRAGMENTS, TRAVEL_LOCATIONS } from '../data/memories';
import { TREASURE_ITEMS } from '../data/specialFeatures';
import { ambientAudio } from '../utils/ambientAudio';

interface UniverseContextValue {
  activeChapter: ChapterId;
  setActiveChapter: (chapter: ChapterId) => void;
  navigateToSection: (chapter: ChapterId, elementId?: string) => void;
  activeDestination: DestinationWorldId | null;
  setActiveDestination: (dest: DestinationWorldId | null) => void;
  journeyStarted: boolean;
  startJourney: () => void;
  discoveredTreasures: string[];
  discoverTreasure: (id: string) => void;
  latestTreasureToast: string | null;
  dismissTreasureToast: () => void;
  treasureModalOpen: boolean;
  setTreasureModalOpen: (open: boolean) => void;
  favoriteSongIds: string[];
  toggleFavoriteSong: (id: string) => void;
  surpriseOpen: boolean;
  openSurpriseMemory: () => void;
  closeSurpriseMemory: () => void;
  currentSurpriseItem: MemoryItem | null;
  lightboxMemory: MemoryItem | null;
  setLightboxMemory: (item: MemoryItem | null) => void;
  reducedMotion: boolean;
  pauseBackgroundMusicForMedia: () => void;
}

const UniverseContext = createContext<UniverseContextValue | null>(null);

const TREASURE_STORAGE_KEY = 'private_universe_treasures_v1';
const FAVORITES_STORAGE_KEY = 'private_universe_favorite_songs_v1';

export const UniverseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('beach');
  const [activeDestination, setActiveDestination] = useState<DestinationWorldId | null>('college');
  const [journeyStarted, setJourneyStarted] = useState(false);

  const [discoveredTreasures, setDiscoveredTreasures] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(TREASURE_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [favoriteSongIds, setFavoriteSongIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : ['song-1'];
    } catch {
      return ['song-1'];
    }
  });

  const [latestTreasureToast, setLatestTreasureToast] = useState<string | null>(null);
  const [treasureModalOpen, setTreasureModalOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [seenSurpriseIds, setSeenSurpriseIds] = useState<string[]>([]);
  const [currentSurpriseItem, setCurrentSurpriseItem] = useState<MemoryItem | null>(null);
  const [lightboxMemory, setLightboxMemory] = useState<MemoryItem | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const discoverTreasure = useCallback((id: string) => {
    setDiscoveredTreasures((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(TREASURE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      const item = TREASURE_ITEMS.find((t) => t.id === id);
      if (item) {
        setLatestTreasureToast(`Discovered ${next.length}/${TREASURE_ITEMS.length}: ${item.name}`);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!latestTreasureToast) return;
    const t = window.setTimeout(() => setLatestTreasureToast(null), 5000);
    return () => window.clearTimeout(t);
  }, [latestTreasureToast]);

  const toggleFavoriteSong = useCallback((id: string) => {
    setFavoriteSongIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const navigateToSection = useCallback((chapter: ChapterId, elementId?: string) => {
    setActiveChapter(chapter);
    if (chapter === 'college' || chapter === 'travel' || chapter === 'delhi') {
      setActiveDestination(chapter);
    }
    if (elementId) {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        }
      });
    }
  }, [reducedMotion]);

  const startJourney = useCallback(() => {
    setJourneyStarted(true);
    void ambientAudio.start();
    navigateToSection('smile', 'chapter-smile');
  }, [navigateToSection]);

  const surprisePool = useMemo<MemoryItem[]>(() => {
    const travelItems: MemoryItem[] = TRAVEL_LOCATIONS.map((loc) => ({
      id: `surp-${loc.id}`,
      title: loc.name,
      description: loc.story,
      imagePath: loc.coverImage,
      fallbackScene: loc.fallbackScene,
      date: loc.date,
      location: loc.regionLabel,
      chapter: 'travel',
      memoryType: 'photo',
      handwrittenNote: loc.caption,
    }));

    const delhiItems: MemoryItem[] = DELHI_FRAGMENTS.map((frag) => ({
      id: `surp-${frag.id}`,
      title: frag.title,
      description: frag.content,
      imagePath: frag.mediaPath,
      fallbackScene: frag.fallbackScene,
      audioPath: frag.audioPath,
      date: frag.date,
      location: frag.stationName,
      chapter: 'delhi',
      memoryType: frag.fragmentType,
    }));

    return [...COLLEGE_MEMORIES, ...COLLEGE_SCRATCH_CARDS, ...travelItems, ...delhiItems];
  }, []);

  const openSurpriseMemory = useCallback(() => {
    let available = surprisePool.filter((m) => !seenSurpriseIds.includes(m.id));
    let resetIds = seenSurpriseIds;
    if (available.length === 0) {
      available = surprisePool;
      resetIds = [];
    }
    const chosen = available[Math.floor(Math.random() * available.length)];
    setCurrentSurpriseItem(chosen);
    setSeenSurpriseIds([...resetIds, chosen.id]);
    setSurpriseOpen(true);
  }, [seenSurpriseIds, surprisePool]);

  const pauseBackgroundMusicForMedia = useCallback(() => {
    ambientAudio.pause();
  }, []);

  const value: UniverseContextValue = {
    activeChapter,
    setActiveChapter,
    navigateToSection,
    activeDestination,
    setActiveDestination,
    journeyStarted,
    startJourney,
    discoveredTreasures,
    discoverTreasure,
    latestTreasureToast,
    dismissTreasureToast: () => setLatestTreasureToast(null),
    treasureModalOpen,
    setTreasureModalOpen,
    favoriteSongIds,
    toggleFavoriteSong,
    surpriseOpen,
    openSurpriseMemory,
    closeSurpriseMemory: () => setSurpriseOpen(false),
    currentSurpriseItem,
    lightboxMemory,
    setLightboxMemory,
    reducedMotion,
    pauseBackgroundMusicForMedia,
  };

  return <UniverseContext.Provider value={value}>{children}</UniverseContext.Provider>;
};

export function useUniverseState() {
  const ctx = useContext(UniverseContext);
  if (!ctx) throw new Error('useUniverseState must be used within UniverseProvider');
  return ctx;
}
