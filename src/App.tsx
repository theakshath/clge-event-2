import React, { useState } from 'react';
import { BuildingData } from './data/campusData';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { BuildingInfoCard } from './components/ui/BuildingInfoCard';
import { EventsSection } from './components/ui/EventsSection';
import { AiAssistant } from './components/ui/AiAssistant';
import { Footer } from './components/ui/Footer';

export default function App() {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [hoveredBuildingId, setHoveredBuildingId] = useState<string | null>(null);

  const handleSelectBuilding = (building: BuildingData | null) => {
    setSelectedBuilding(building);
  };

  const handleFocusBuildingAndScroll = (building: BuildingData) => {
    setSelectedBuilding(building);
    const canvasContainer = document.getElementById('3d-canvas-container');
    if (canvasContainer) {
      canvasContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Interactive Container */}
      <main className="flex-1">
        {/* Hero Section featuring 3D Campus & Search */}
        <HeroSection
          selectedBuilding={selectedBuilding}
          hoveredBuildingId={hoveredBuildingId}
          onSelectBuilding={handleSelectBuilding}
          onHoverBuilding={(id) => setHoveredBuildingId(id)}
          onOpenAssistant={() => handleNavigate('assistant')}
        />

        {/* Selected Building Detail Popup Card */}
        <BuildingInfoCard
          building={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
          onRefocus={(building) => handleFocusBuildingAndScroll(building)}
        />

        {/* Upcoming Events Section */}
        <EventsSection
          onLocateEvent={(building) => handleFocusBuildingAndScroll(building)}
        />
      </main>

      {/* Context-Aware AI Campus Assistant */}
      <AiAssistant
        onShowLocation={(building) => handleFocusBuildingAndScroll(building)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
