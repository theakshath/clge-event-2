'use client';

import React, { useState } from 'react';
import { EVENTS, CampusEvent, BUILDINGS, BuildingData } from '@/data/campusData';
import { Calendar, Clock, MapPin, Navigation, ArrowUpRight, X, Sparkles, UserCheck } from 'lucide-react';

interface EventsSectionProps {
  onLocateEvent: (building: BuildingData) => void;
}

export function EventsSection({ onLocateEvent }: EventsSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);

  const handleLocate = (evt: CampusEvent) => {
    const targetBuilding = BUILDINGS.find((b) => b.id === evt.locationId);
    if (targetBuilding) {
      setSelectedEvent(null);
      onLocateEvent(targetBuilding);
    }
  };

  return (
    <section id="events" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upcoming Campus Activities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What&apos;s happening?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
            Explore workshops, flagship tech festivals, and coding tournaments taking place across campus buildings.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Badge & Date */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {event.badge}
                </span>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  {event.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                {event.description}
              </p>
            </div>

            {/* Event Metadata */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{event.locationName}</span>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>View Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                {selectedEvent.category}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {selectedEvent.badge}
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                {selectedEvent.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Speaker Info if available */}
            {selectedEvent.speaker && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700">
                <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400 font-medium block">Host / Keynote Speaker:</span>
                  <span className="font-semibold text-slate-900">{selectedEvent.speaker}</span>
                </div>
              </div>
            )}

            {/* Time & Venue Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="text-slate-400 font-medium block">Date & Time</span>
                  <span className="font-bold text-slate-900">{selectedEvent.date} @ {selectedEvent.time}</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 font-medium block">Venue Location</span>
                  <span className="font-bold text-slate-900 truncate block">{selectedEvent.locationName}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleLocate(selectedEvent)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4" />
                <span>Locate Event in 3D</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
