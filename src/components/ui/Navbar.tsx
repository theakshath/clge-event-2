'use client';

import React, { useState } from 'react';
import { Compass, Calendar, MessageSquare, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Explore', href: '#explore', icon: Compass },
    { label: 'Events', href: '#events', icon: Calendar },
    { label: 'Assistant', href: '#assistant', icon: MessageSquare },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none" role="banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <a
          href="#explore"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('explore');
          }}
          className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label="UniVerse 3D Homepage"
        >
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs tracking-wider" aria-hidden="true">
            3D
          </div>
          <span className="font-semibold text-slate-900 text-base tracking-tight">
            UniVerse
          </span>
          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
            Campus
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm" role="navigation" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.label.toLowerCase());
                }}
                className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100/80 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label={`Navigate to ${link.label}`}
              >
                <Icon className="w-4 h-4 text-slate-500" aria-hidden="true" />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-full shadow-md transition-all hover:shadow-blue-500/20 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Enter Interactive 3D Campus"
          >
            <span>Enter Campus</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden bg-white/90 backdrop-blur-md p-2 rounded-full border border-slate-200 text-slate-700 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-sm bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-slate-200 shadow-xl pointer-events-auto flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200" role="dialog" aria-label="Mobile Menu">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onNavigate(link.label.toLowerCase());
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
              >
                <Icon className="w-4 h-4 text-blue-600" aria-hidden="true" />
                {link.label}
              </a>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('explore');
            }}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-2.5 rounded-xl shadow-sm text-sm cursor-pointer"
          >
            Enter Campus 3D
          </button>
        </div>
      )}
    </header>
  );
}
