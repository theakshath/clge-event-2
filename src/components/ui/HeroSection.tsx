'use client';

import React from 'react';
import { BuildingData } from '@/data/campusData';
import { SmartSearch } from './SmartSearch';
import { CampusCanvas } from '../3d/CampusCanvas';
import { ArrowRight, Compass, MessageSquare, Sparkles, Layers } from 'lucide-react';

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
  return (
    <section id="explore" className="pt-28 pb-12 px-4 sm:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
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
                const el = document.getElementById('3d-canvas-container');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-7 py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Campus</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAssistant}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-sm px-6 py-4 rounded-2xl shadow-md hover:border-slate-300 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Ask Assistant</span>
            </button>
          </div>

          {/* Statistics / Quick Features */}
          <div className="pt-6 border-t border-slate-200/60 w-full grid grid-cols-3 gap-4 text-slate-700">
            <div>
              <p className="text-2xl font-black text-slate-900">6+</p>
              <p className="text-xs text-slate-500 font-medium">3D Landmarks</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">100%</p>
              <p className="text-xs text-slate-500 font-medium">Interactive</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600">Live</p>
              <p className="text-xs text-slate-500 font-medium">Event Search</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Campus Experience */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Smart Search Bar mounted right above the 3D Scene */}
          <div className="flex items-center justify-between gap-3">
            <SmartSearch
              onSelectBuilding={(building) => onSelectBuilding(building)}
              selectedBuilding={selectedBuilding}
            />
            {selectedBuilding && (
              <button
                onClick={() => onSelectBuilding(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs whitespace-nowrap cursor-pointer"
              >
                Reset View
              </button>
            )}
          </div>

          {/* 3D Canvas Container */}
          <div
            id="3d-canvas-container"
            className="w-full h-[460px] sm:h-[520px] bg-gradient-to-b from-slate-100/90 to-slate-200/50 rounded-3xl border border-slate-200/80 shadow-2xl relative overflow-hidden group"
          >
            {/* Top Canvas Bar Badge */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-800">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Low-Poly 3D Campus</span>
            </div>

            {/* Render 3D Canvas */}
            <CampusCanvas
              selectedBuilding={selectedBuilding}
              hoveredBuildingId={hoveredBuildingId}
              onSelectBuilding={onSelectBuilding}
              onHoverBuilding={onHoverBuilding}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
