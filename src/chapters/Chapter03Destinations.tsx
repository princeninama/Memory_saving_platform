import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { useUniverseState } from '../hooks/useUniverseState';
import { DestinationWorldId } from '../types/universe';

export const Chapter03Destinations: React.FC = () => {
  const { activeDestination, setActiveDestination, navigateToSection } = useUniverseState();

  const handleSelectWorld = (worldId: DestinationWorldId) => {
    setActiveDestination(worldId);
    navigateToSection(worldId, 'active-memory-world');
  };

  return (
    <section
      id="chapter-destinations"
      className="relative w-full bg-[#102D3A] text-[#F8F3E9] py-24 sm:py-32 px-6 sm:px-12 border-t border-[#E8D6B8]/10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl mb-14">
          <p className="font-mono-meta text-xs text-[#D8A45B]">
            {SITE_CONTENT.destinationsIntro.kicker}
          </p>
          <h2 className="mt-3 font-editorial text-4xl sm:text-6xl font-normal text-[#F8F3E9]">
            {SITE_CONTENT.destinationsIntro.headline}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E8D6B8]/85">
            {SITE_CONTENT.destinationsIntro.subheading}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {SITE_CONTENT.destinationsIntro.worlds.map((world, idx) => {
            const isSelected = activeDestination === world.id;
            return (
              <button
                key={world.id}
                type="button"
                onClick={() => handleSelectWorld(world.id)}
                className={`group relative overflow-hidden text-left border transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[420px] sm:min-h-[480px] ${
                  isSelected
                    ? 'border-[#D8A45B] ring-1 ring-[#D8A45B]/50'
                    : 'border-[#E8D6B8]/20 hover:border-[#D8A45B]/70'
                }`}
              >
                <img
                  src={world.image}
                  alt={world.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#091521]/95 via-[#091521]/45 to-[#091521]/30 transition-opacity group-hover:opacity-90"
                />

                <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between text-xs font-mono-meta text-[#E8D6B8]">
                  <span>0{idx + 1}</span>
                  <span>{world.dateDetail}</span>
                </div>

                <div className="relative z-10 p-6 sm:p-8">
                  <p className="font-hand text-2xl text-[#D8A45B]">
                    "{world.label}"
                  </p>
                  <h3 className="mt-2 font-editorial text-3xl sm:text-4xl text-[#F8F3E9]">
                    {world.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#AEBCC5]">
                    {world.handwrittenNote}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#F8F3E9] group-hover:text-[#D8A45B] transition-colors">
                    <span>{isSelected ? 'Currently open below' : 'Step into this world'}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
