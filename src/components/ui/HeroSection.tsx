'use client';

import React, { useState, lazy, Suspense } from 'react';
import { BuildingData, BUILDINGS } from '@/data/campusData';
import { SmartSearch } from './SmartSearch';
import { ArrowRight, Compass, MessageSquare, Sparkles, Layers, Filter, Loader2 } from 'lucide-react';

// Lazy load the heavy 3D WebGL Canvas for 95%+ Lighthouse Performance Score
const CampusCanvas = lazy(() =>
  import('../3d/CampusCanvas').then((mod) => ({ default: mod.CampusCanvas }))
);

interface HeroSectionProps {
  selectedBuilding: BuildingData | null;
  hoveredBuildingId: string | null;
  onSelectBuilding: (building: BuildingData | null) => void;
  onHoverBuilding: (id: string | null) => void;
  onOpenAssistant: () => void;
}

export function HeroSection({
  selectedBuilding,
  hoveredBuildingId,
  onSelectBuilding,
  onHoverBuilding,
  onOpenAssistant
}: HeroSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Academic', 'Engineering', 'Library', 'Events', 'Student Life'];

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      onSelectBuilding(null);
    } else {
      const match = BUILDINGS.find((b) => b.category === cat);
      if (match) onSelectBuilding(match);
    }
  };

  return (
    <section id="explore" className="pt-24 pb-12 px-4 sm:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center" role="main" aria-label="Interactive Campus Hero">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" aria-hidden="true" />
            <span>INTERACTIVE CAMPUS</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
            Your Campus.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Reimagined.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
            Explore your campus in 3D, discover what&apos;s happening, and find your way around in seconds.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
            <button
              onClick={() => {
                const cse = BUILDINGS.find((b) => b.id === 'cse-block');
                if (cse) onSelectBuilding(cse);
                const el = document.getElementById('3d-canvas-container');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-7 py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Explore 3D Campus"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Explore Campus 3D</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={onOpenAssistant}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-sm px-6 py-4 rounded-2xl shadow-md hover:border-slate-300 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Ask UniVerse Assistant"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Ask Assistant</span>
            </button>
          </div>

          {/* Interactive Quick Stats Cards */}
          <div className="pt-6 border-t border-slate-200/60 w-full grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                const b = BUILDINGS.find((x) => x.id === 'academic-block');
                if (b) onSelectBuilding(b);
              }}
              className="p-3 bg-white hover:bg-blue-50/50 border border-slate-200/80 rounded-2xl text-left transition-all hover:border-blue-300 cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Select Academic Block landmark"
            >
              <p className="text-xl font-black text-slate-900">6</p>
              <p className="text-[11px] text-slate-500 font-medium truncate">3D Blocks</p>
            </button>

            <button
              onClick={() => {
                const b = BUILDINGS.find((x) => x.id === 'cse-block');
                if (b) onSelectBuilding(b);
              }}
              className="p-3 bg-white hover:bg-blue-50/50 border border-slate-200/80 rounded-2xl text-left transition-all hover:border-blue-300 cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Select CSE Block landmark"
            >
              <p className="text-xl font-black text-slate-900">100%</p>
              <p className="text-[11px] text-slate-500 font-medium truncate">Interactive</p>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('events');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-3 bg-white hover:bg-blue-50/50 border border-slate-200/80 rounded-2xl text-left transition-all hover:border-blue-300 cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Scroll to events section"
            >
              <p className="text-xl font-black text-blue-600">Live</p>
              <p className="text-[11px] text-slate-500 font-medium truncate">4 Events</p>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Campus Experience */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Smart Search Bar */}
          <div className="flex items-center justify-between gap-3">
            <SmartSearch
              onSelectBuilding={(building) => onSelectBuilding(building)}
              selectedBuilding={selectedBuilding}
            />
            {selectedBuilding && (
              <button
                onClick={() => onSelectBuilding(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200 shadow-2xs whitespace-nowrap cursor-pointer transition-all hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Reset 3D camera view"
              >
                Reset View
              </button>
            )}
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs" role="region" aria-label="Campus Building Categories">
            <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0 text-[11px]">
              <Filter className="w-3 h-3 text-blue-600" aria-hidden="true" />
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1 rounded-xl font-medium text-[11px] transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
                aria-label={`Filter by ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3D Canvas Container */}
          <div
            id="3d-canvas-container"
            className="w-full h-[450px] sm:h-[500px] bg-gradient-to-b from-slate-100/90 to-slate-200/50 rounded-3xl border border-slate-200/80 shadow-2xl relative overflow-hidden group"
          >
            {/* Top Canvas Bar Badge */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-800">
              <Layers className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>Low-Poly 3D Campus</span>
            </div>

            {/* Render 3D Canvas with Async Dynamic Import & Skeleton for 95%+ Lighthouse Score */}
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100/80 text-slate-500 gap-3">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
                    Initializing Interactive 3D Canvas...
                  </span>
                </div>
              }
            >
              <CampusCanvas
                selectedBuilding={selectedBuilding}
                hoveredBuildingId={hoveredBuildingId}
                onSelectBuilding={onSelectBuilding}
                onHoverBuilding={onHoverBuilding}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
