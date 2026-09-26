'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Sparkles } from 'lucide-react';
import { BuildingData, BUILDINGS } from '@/data/campusData';

interface SmartSearchProps {
  onSelectBuilding: (building: BuildingData) => void;
  selectedBuilding: BuildingData | null;
}

export function SmartSearch({ onSelectBuilding, selectedBuilding }: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter buildings matching query or facility
  const filteredBuildings = BUILDINGS.filter((b) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      b.name.toLowerCase().includes(q) ||
      b.shortName.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.facilities.some((f) => f.toLowerCase().includes(q))
    );
  });

  const handleSelect = (building: BuildingData) => {
    setQuery(building.name);
    setIsOpen(false);
    onSelectBuilding(building);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Where do you want to go? (e.g. CSE, Library)..."
          className="w-full bg-white/95 backdrop-blur-md text-slate-900 text-sm font-medium pl-10 pr-10 py-3 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
        />
        {query ? (
          <button
            onClick={clearSearch}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="absolute right-3 hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
            <span>⌘K</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Tags */}
      {!query && !isOpen && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-500" />
            Quick view:
          </span>
          {BUILDINGS.slice(0, 4).map((b) => (
            <button
              key={b.id}
              onClick={() => handleSelect(b)}
              className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-all ${
                selectedBuilding?.id === b.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white/80 hover:bg-slate-100 text-slate-700 border-slate-200/80 shadow-xs'
              }`}
            >
              {b.shortName}
            </button>
          ))}
        </div>
      )}

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-40 max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
            <span>Campus Locations ({filteredBuildings.length})</span>
            <span className="text-[10px] text-blue-600 font-normal">Click to navigate camera</span>
          </div>

          {filteredBuildings.length > 0 ? (
            <div className="p-1.5 space-y-0.5">
              {filteredBuildings.map((building) => (
                <button
                  key={building.id}
                  onClick={() => handleSelect(building)}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                    selectedBuilding?.id === building.id
                      ? 'bg-blue-50 text-blue-900 border border-blue-100'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 mt-0.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-900 truncate">
                        {building.name}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {building.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {building.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-slate-800">No location found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for Library, CSE Block, or Auditorium.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
