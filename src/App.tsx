import React, { useEffect, useState } from 'react';
import { Compass, X } from 'lucide-react';
import { UniverseProvider, useUniverseState } from './hooks/useUniverseState';
import { SCENE_ASSETS } from './data/siteContent';
import { PasswordGate } from './components/PasswordGate';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingNav } from './components/FloatingNav';
import { PersistentAudioBar } from './components/PersistentAudioBar';
import { TreasureTrackerModal } from './components/TreasureTrackerModal';
import { SurpriseMeModal } from './components/SurpriseMeModal';
import { MemoryLightbox } from './components/MemoryLightbox';
import { Chapter01Beach } from './chapters/Chapter01Beach';
import { Chapter02FirstSmile } from './chapters/Chapter02FirstSmile';
import { Chapter03Destinations } from './chapters/Chapter03Destinations';
import { WorldCollege } from './chapters/WorldCollege';
import { WorldGhumiGhumi } from './chapters/WorldGhumiGhumi';
import { WorldDelhi } from './chapters/WorldDelhi';
import { Chapter04Stories } from './chapters/Chapter04Stories';
import { Chapter05Mountains } from './chapters/Chapter05Mountains';
import { Chapter06Voices } from './chapters/Chapter06Voices';
import { Chapter07MusicRoom } from './chapters/Chapter07MusicRoom';
import { Chapter08ExtrasAndLetter } from './chapters/Chapter08ExtrasAndLetter';
import { ChapterId, DestinationWorldId } from './types/universe';

const WORLD_TABS: { id: DestinationWorldId; label: string }[] = [
  { id: 'college', label: 'College Life' },
  { id: 'travel', label: 'Ghumi Ghumi Life' },
  { id: 'delhi', label: 'Delhi Life' },
];

const UniverseJourney: React.FC<{ onLock: () => void }> = ({ onLock }) => {
  const {
    activeDestination,
    setActiveDestination,
    setActiveChapter,
    latestTreasureToast,
    dismissTreasureToast,
    setTreasureModalOpen,
  } = useUniverseState();

  const currentWorld = activeDestination || 'college';

  // Keep active chapter indicator synced while scrolling naturally
  useEffect(() => {
    const sections: { id: string; chapter: ChapterId }[] = [
      { id: 'chapter-beach', chapter: 'beach' },
      { id: 'chapter-smile', chapter: 'smile' },
      { id: 'chapter-destinations', chapter: 'destinations' },
      { id: 'active-memory-world', chapter: currentWorld },
      { id: 'chapter-stories', chapter: 'stories' },
      { id: 'chapter-mountains', chapter: 'mountains' },
      { id: 'chapter-voices', chapter: 'voices' },
      { id: 'chapter-music', chapter: 'music' },
      { id: 'chapter-extras', chapter: 'extras' },
      { id: 'chapter-letter', chapter: 'letter' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) setActiveChapter(match.chapter);
          }
        }
      },
      { threshold: 0.25 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentWorld, setActiveChapter]);

  return (
    <div className="min-h-screen w-full bg-[#091521] text-[#F8F3E9]">
      <FloatingNav onLock={onLock} />

      <main>
        <Chapter01Beach />
        <Chapter02FirstSmile />
        <Chapter03Destinations />

        {/* Active Memory World Explorer */}
        <section id="active-memory-world" aria-label="Memory Worlds">
          <div className="bg-[#091521] border-y border-[#E8D6B8]/15 px-6 sm:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono-meta text-xs text-[#AEBCC5]">
              Exploring World
            </span>
            <div className="flex flex-wrap gap-2">
              {WORLD_TABS.map((tab) => {
                const active = currentWorld === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveDestination(tab.id);
                      setActiveChapter(tab.id);
                    }}
                    className={`px-4 py-2 text-xs font-medium cursor-pointer transition-colors ${
                      active
                        ? 'bg-[#D8A45B] text-[#091521]'
                        : 'border border-[#E8D6B8]/20 text-[#E8D6B8] hover:border-[#D8A45B]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {currentWorld === 'college' ? <WorldCollege /> : null}
          {currentWorld === 'travel' ? <WorldGhumiGhumi /> : null}
          {currentWorld === 'delhi' ? <WorldDelhi /> : null}
        </section>

        <Chapter04Stories />
        <Chapter05Mountains />
        <Chapter06Voices />
        <Chapter07MusicRoom />
        <Chapter08ExtrasAndLetter />
      </main>

      {/* Subtle footer with explicit privacy lock action */}
      <footer className="bg-[#F8F3E9] text-[#102D3A] border-t border-[#102D3A]/10 px-6 sm:px-12 py-8">
        <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-between gap-4 text-xs text-[#102D3A]/70">
          <span>A Little Place in the Internet · Private Edition</span>
          <button
            type="button"
            onClick={onLock}
            className="underline hover:text-[#102D3A] cursor-pointer"
          >
            Lock this private space
          </button>
        </div>
      </footer>

      <PersistentAudioBar />
      <TreasureTrackerModal />
      <SurpriseMeModal />
      <MemoryLightbox />

      {/* Subtle treasure discovery notification */}
      {latestTreasureToast ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-4 z-40 flex items-center gap-3 border border-[#D8A45B]/50 bg-[#091521]/95 px-4 py-3 text-xs text-[#F8F3E9] shadow-xl backdrop-blur-md"
        >
          <Compass className="h-4 w-4 text-[#D8A45B] shrink-0" aria-hidden="true" />
          <button
            type="button"
            onClick={() => {
              dismissTreasureToast();
              setTreasureModalOpen(true);
            }}
            className="text-left hover:underline cursor-pointer"
          >
            {latestTreasureToast}
          </button>
          <button
            type="button"
            onClick={dismissTreasureToast}
            aria-label="Dismiss notification"
            className="text-[#AEBCC5] hover:text-[#F8F3E9] cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [hint, setHint] = useState('');
  const [heroReady, setHeroReady] = useState(false);

  // Check server-side session status + preload only the opening beach scene
  useEffect(() => {
    let active = true;

    fetch('/api/auth/status')
      .then((r) => r.json())
      .then((data: { authenticated?: boolean; hint?: string }) => {
        if (!active) return;
        setAuthenticated(Boolean(data.authenticated));
        setHint(data.hint || '');
        setAuthChecked(true);
      })
      .catch(() => {
        if (!active) return;
        setAuthChecked(true);
      });

    const img = new Image();
    img.src = SCENE_ASSETS.beachGoldenHour;
    img.onload = () => {
      if (active) setHeroReady(true);
    };
    img.onerror = () => {
      if (active) setHeroReady(true);
    };

    return () => {
      active = false;
    };
  }, []);

  const handleLock = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthenticated(false);
  };

  if (!authChecked || !heroReady) {
    return <LoadingScreen />;
  }

  if (!authenticated) {
    return (
      <PasswordGate
        hint={hint}
        onUnlocked={() => setAuthenticated(true)}
      />
    );
  }

  return (
    <UniverseProvider>
      <UniverseJourney onLock={handleLock} />
    </UniverseProvider>
  );
}

export default App;
