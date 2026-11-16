import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Eye, MapPin, ArrowLeft } from 'lucide-react';
import { TRAVEL_DIARY_NOTES, TRAVEL_LOCATIONS } from '../data/memories';
import { useUniverseState } from '../hooks/useUniverseState';
import { MediaFrame } from '../components/MediaFrame';
import { TravelLocation } from '../types/universe';

const DIARY_TABS: { id: TravelLocation['diaryCategory']; label: string }[] = [
  { id: 'transport', label: 'Transport' },
  { id: 'food', label: 'Food' },
  { id: 'funny', label: 'Funny Incidents' },
  { id: 'landscape', label: 'Landscapes' },
  { id: 'revisit', label: 'Want to Revisit' },
];

export const WorldGhumiGhumi: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<TravelLocation>(TRAVEL_LOCATIONS[0]);
  const [zoomedIntoLocation, setZoomedIntoLocation] = useState(false);
  const [perspective, setPerspective] = useState<'your' | 'my'>('your');
  const [diaryTab, setDiaryTab] = useState<TravelLocation['diaryCategory']>('transport');
  const { discoverTreasure, discoveredTreasures } = useUniverseState();

  const compassFound = discoveredTreasures.includes('treasure-3');

  const handlePinSelect = (loc: TravelLocation) => {
    setSelectedLoc(loc);
    setZoomedIntoLocation(true);
  };

  const activeEyes = perspective === 'your' ? selectedLoc.yourEyesMedia : selectedLoc.myEyesMedia;

  return (
    <div className="bg-[#102D3A] text-[#F8F3E9] py-20 sm:py-28 px-6 sm:px-12">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Header */}
        <header className="border-b border-[#E8D6B8]/15 pb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="font-mono-meta text-xs text-[#D8A45B]">
              Memory World B · Travel Documentary
            </p>
            <h2 className="mt-3 font-editorial text-4xl sm:text-6xl font-normal text-[#F8F3E9]">
              Ghumi Ghumi Life
            </h2>
            <p className="mt-3 font-hand text-2xl sm:text-3xl text-[#E8D6B8]">
              "Everywhere felt better with these moments."
            </p>
          </div>

          {/* Hidden Treasure #3: Traveller's Brass Compass */}
          <button
            type="button"
            onClick={() => discoverTreasure('treasure-3')}
            className={`inline-flex items-center gap-2 border px-4 py-2.5 text-xs transition-colors cursor-pointer self-start lg:self-end ${
              compassFound
                ? 'border-[#D8A45B] bg-[#D8A45B]/20 text-[#E8D6B8]'
                : 'border-[#E8D6B8]/25 text-[#AEBCC5] hover:border-[#D8A45B] hover:text-[#F8F3E9]'
            }`}
          >
            <Compass className="h-4 w-4 text-[#D8A45B]" aria-hidden="true" />
            <span>
              {compassFound
                ? 'Found: Traveller’s Brass Compass'
                : 'Inspect brass compass on map margin'}
            </span>
          </button>
        </header>

        {/* Interactive Map -> Zoom Transition -> Fullscreen Photograph & Story */}
        <section aria-labelledby="travel-map-heading" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 id="travel-map-heading" className="font-editorial text-3xl text-[#F8F3E9]">
                Our Illustrated Route
              </h3>
              <p className="text-xs text-[#AEBCC5] mt-1">
                Select any destination pin to zoom from the route into the place itself. (Route stops are editable; no GPS coordinates are fabricated.)
              </p>
            </div>
            {zoomedIntoLocation ? (
              <button
                type="button"
                onClick={() => setZoomedIntoLocation(false)}
                className="inline-flex items-center gap-2 border border-[#E8D6B8]/25 px-4 py-2 text-xs text-[#E8D6B8] hover:border-[#D8A45B] cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Back to route map</span>
              </button>
            ) : null}
          </div>

          <div className="relative overflow-hidden border border-[#E8D6B8]/20 bg-[#091521] min-h-[460px]">
            <AnimatePresence mode="wait">
              {!zoomedIntoLocation ? (
                <motion.div
                  key="route-map"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.15 }}
                  transition={{ duration: 0.45 }}
                  className="relative h-[460px] w-full p-6 sm:p-10"
                >
                  {/* Topographic editorial route SVG */}
                  <svg
                    viewBox="0 0 1000 500"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full opacity-35"
                  >
                    <path
                      d="M 100 380 Q 260 310 420 240 T 720 150 T 900 100"
                      fill="none"
                      stroke="#D8A45B"
                      strokeWidth="2"
                      strokeDasharray="6 8"
                    />
                    <path
                      d="M 0 440 Q 300 390 540 420 T 1000 350"
                      fill="none"
                      stroke="#AEBCC5"
                      strokeWidth="0.7"
                      opacity="0.4"
                    />
                    <path
                      d="M 0 180 Q 280 120 580 190 T 1000 140"
                      fill="none"
                      stroke="#AEBCC5"
                      strokeWidth="0.7"
                      opacity="0.3"
                    />
                  </svg>

                  {/* Clickable destination pins */}
                  {TRAVEL_LOCATIONS.map((loc, idx) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handlePinSelect(loc)}
                      style={{ left: `${loc.mapX}%`, top: `${loc.mapY}%` }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer focus-visible:outline-none"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8A45B] bg-[#091521]/90 text-[#D8A45B] transition-transform duration-200 group-hover:scale-115 group-hover:bg-[#D8A45B] group-hover:text-[#091521]">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="mt-2 bg-[#091521]/90 border border-[#E8D6B8]/20 px-2.5 py-1 text-xs text-[#F8F3E9] whitespace-nowrap">
                        0{idx + 1}. {loc.name}
                      </span>
                    </button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`location-${selectedLoc.id}`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="grid lg:grid-cols-[1.35fr_1fr] items-stretch"
                >
                  <MediaFrame
                    src={selectedLoc.coverImage}
                    fallbackSrc={selectedLoc.fallbackScene}
                    alt={selectedLoc.name}
                    aspectClass="aspect-[16/10] lg:aspect-auto lg:min-h-[460px]"
                    allowLocalPreview
                    slotHint="Upload trip photo to private-media/images/travel/ or preview local photo"
                  />

                  <div className="p-6 sm:p-10 flex flex-col justify-between bg-[#091521]">
                    <div>
                      <p className="font-mono-meta text-xs text-[#D8A45B]">
                        {selectedLoc.regionLabel} · {selectedLoc.date || 'Editable date'}
                      </p>
                      <h4 className="mt-2 font-editorial text-3xl text-[#F8F3E9]">
                        {selectedLoc.name}
                      </h4>
                      <p className="mt-4 text-sm leading-relaxed text-[#E8D6B8]/90">
                        {selectedLoc.story}
                      </p>
                      <p className="mt-4 font-hand text-2xl text-[#D8A45B]">
                        "{selectedLoc.caption}"
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#E8D6B8]/15 flex flex-wrap gap-2">
                      {TRAVEL_LOCATIONS.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => setSelectedLoc(loc)}
                          className={`px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                            loc.id === selectedLoc.id
                              ? 'bg-[#D8A45B] text-[#091521] font-medium'
                              : 'border border-[#E8D6B8]/20 text-[#AEBCC5] hover:text-[#F8F3E9]'
                          }`}
                        >
                          {loc.name.split('(')[0].trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Special Feature: "See this place through my eyes" */}
        <section aria-labelledby="eyes-heading" className="border-t border-[#E8D6B8]/15 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-mono-meta text-xs text-[#D8A45B] inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Two Perspectives · {selectedLoc.name}</span>
              </p>
              <h3 id="eyes-heading" className="mt-2 font-editorial text-3xl sm:text-4xl text-[#F8F3E9]">
                See this place through my eyes
              </h3>
            </div>

            <div className="inline-flex border border-[#E8D6B8]/25 bg-[#091521] p-1">
              <button
                type="button"
                onClick={() => setPerspective('your')}
                className={`px-4 py-2 text-xs font-medium cursor-pointer transition-colors ${
                  perspective === 'your'
                    ? 'bg-[#D8A45B] text-[#091521]'
                    : 'text-[#AEBCC5] hover:text-[#F8F3E9]'
                }`}
              >
                Your eyes.
              </button>
              <button
                type="button"
                onClick={() => setPerspective('my')}
                className={`px-4 py-2 text-xs font-medium cursor-pointer transition-colors ${
                  perspective === 'my'
                    ? 'bg-[#D8A45B] text-[#091521]'
                    : 'text-[#AEBCC5] hover:text-[#F8F3E9]'
                }`}
              >
                My eyes.
              </button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-center border border-[#E8D6B8]/15 bg-[#091521]/70 p-5 sm:p-8">
            <MediaFrame
              src={activeEyes.imagePath}
              fallbackSrc={selectedLoc.fallbackScene}
              alt={`${selectedLoc.name} through ${perspective} eyes`}
              aspectClass="aspect-[4/3]"
              allowLocalPreview
              slotHint={activeEyes.caption}
            />
            <div className="space-y-4">
              <span className="font-mono-meta text-xs text-[#D8A45B]">
                {perspective === 'your' ? 'Your perspective' : 'My perspective'}
              </span>
              <h4 className="font-editorial text-3xl text-[#F8F3E9]">{activeEyes.note}</h4>
              <p className="text-sm leading-relaxed text-[#AEBCC5]">{activeEyes.caption}</p>
            </div>
          </div>
        </section>

        {/* Interactive Travel Diary */}
        <section aria-labelledby="diary-heading" className="border-t border-[#E8D6B8]/15 pt-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h3 id="diary-heading" className="font-editorial text-3xl text-[#F8F3E9]">
              Interactive Travel Diary
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {DIARY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDiaryTab(tab.id)}
                  className={`px-3.5 py-2 text-xs cursor-pointer transition-colors ${
                    diaryTab === tab.id
                      ? 'bg-[#E8D6B8] text-[#091521] font-medium'
                      : 'border border-[#E8D6B8]/20 text-[#AEBCC5] hover:text-[#F8F3E9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-[#E8D6B8]/15 bg-[#091521]/60 p-6 sm:p-8">
            <p className="font-mono-meta text-xs text-[#D8A45B]">
              {TRAVEL_DIARY_NOTES[diaryTab].title}
            </p>
            <p className="mt-1 text-sm text-[#AEBCC5]">{TRAVEL_DIARY_NOTES[diaryTab].subtitle}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {TRAVEL_DIARY_NOTES[diaryTab].entries.map((entry) => (
                <div key={entry.title} className="border-t border-[#E8D6B8]/15 pt-4">
                  <h4 className="font-editorial text-xl text-[#F8F3E9]">{entry.title}</h4>
                  <p className="mt-2 text-sm text-[#AEBCC5]">{entry.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
