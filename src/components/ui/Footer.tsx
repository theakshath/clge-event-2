'use client';

import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-12 px-4 sm:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
            3D
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">
            UniVerse 3D
          </span>
          <span className="text-xs text-slate-400 font-medium border-l border-slate-200 pl-3">
            Your Campus. Reimagined.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-slate-500">
          <a href="#explore" className="hover:text-slate-900 transition-colors">
            Explore 3D
          </a>
          <a href="#events" className="hover:text-slate-900 transition-colors">
            Events
          </a>
          <a href="#assistant" className="hover:text-slate-900 transition-colors">
            AI Assistant
          </a>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} UniVerse 3D • Built for Competition Excellence
        </div>
      </div>
    </footer>
  );
}
