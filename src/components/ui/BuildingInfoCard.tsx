'use client';

import React from 'react';
import { BuildingData } from '@/data/campusData';
import { X, Navigation, Clock, Layers, CheckCircle2, Building2 } from 'lucide-react';

interface BuildingInfoCardProps {
  building: BuildingData | null;
  onClose: () => void;
  onRefocus: (building: BuildingData) => void;
}

export function BuildingInfoCard({ building, onClose, onRefocus }: BuildingInfoCardProps) {
  if (!building) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 animate-in fade-in slide-in-from-bottom-4 duration-250">
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-5 border border-slate-200/80 shadow-2xl shadow-slate-900/10 flex flex-col gap-4 relative">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {building.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug mt-0.5">
                {building.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close card"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {building.description}
        </p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
            <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Floors</p>
              <p className="font-semibold text-slate-900">{building.details.floors} Floors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Hours</p>
              <p className="font-semibold text-slate-900 truncate">{building.details.hours}</p>
            </div>
          </div>
        </div>

        {/* Facilities List */}
        <div>
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Key Facilities
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {building.facilities.map((facility, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/50"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => onRefocus(building)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>View Location in 3D</span>
          </button>
        </div>
      </div>
    </div>
  );
}
