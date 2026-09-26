'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { BuildingData, BUILDINGS } from '@/data/campusData';
import { Building } from './Building';
import { CampusEnvironment } from './CampusEnvironment';
import { CameraController } from './CameraController';

interface CampusCanvasProps {
  selectedBuilding: BuildingData | null;
  hoveredBuildingId: string | null;
  onSelectBuilding: (building: BuildingData | null) => void;
  onHoverBuilding: (id: string | null) => void;
}

function SceneContent({ selectedBuilding, hoveredBuildingId, onSelectBuilding, onHoverBuilding }: CampusCanvasProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[15, 22, 15]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-bias={-0.0001}
      />
      <hemisphereLight skyColor="#F8FAFC" groundColor="#64748B" intensity={0.5} />

      {/* Orbit Controls with polar angle limits */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2.15} // Prevent camera going under ground
        minDistance={5}
        maxDistance={28}
        target={[0, 0, 0]}
      />

      {/* Camera Controller to smoothly interpolate view */}
      <CameraController selectedBuilding={selectedBuilding} controlsRef={controlsRef} />

      {/* Campus Environment (Terrain, Trees, Roads, Plaza) */}
      <CampusEnvironment />

      {/* Soft Contact Shadows */}
      <ContactShadows position={[0, 0.03, 0]} opacity={0.4} scale={30} blur={2} far={10} />

      {/* Buildings List */}
      {BUILDINGS.map((b) => (
        <Building
          key={b.id}
          building={b}
          isSelected={selectedBuilding?.id === b.id}
          isHovered={hoveredBuildingId === b.id}
          onSelect={(building) => onSelectBuilding(building)}
          onHover={(id) => onHoverBuilding(id)}
        />
      ))}
    </>
  );
}

export function CampusCanvas(props: CampusCanvasProps) {
  return (
    <div className="w-full h-full relative select-none cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 14, 18], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onPointerMissed={() => props.onSelectBuilding(null)}
      >
        <Suspense fallback={null}>
          <SceneContent {...props} />
        </Suspense>
      </Canvas>

      {/* Minimal 3D Controls Guidance Overlay */}
      <div className="absolute bottom-3 left-4 pointer-events-none hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] text-slate-300 border border-slate-700/50">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
        <span>Drag to rotate • Scroll to zoom • Click building to inspect</span>
      </div>
    </div>
  );
}
