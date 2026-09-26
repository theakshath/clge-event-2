'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { BuildingData } from '@/data/campusData';

interface BuildingProps {
  building: BuildingData;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (building: BuildingData) => void;
  onHover: (id: string | null) => void;
}

export function Building({ building, isSelected, isHovered, onSelect, onHover }: BuildingProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [internalHover, setInternalHover] = useState(false);

  const activeHover = isHovered || internalHover;

  // Smooth floating / elevation effect when selected or hovered
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetY = isSelected ? building.coordinates[1] + 0.25 : activeHover ? building.coordinates[1] + 0.15 : building.coordinates[1];
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 6);
  });

  const [w, h, d] = building.size;
  const baseColor = isSelected ? building.accentColor : activeHover ? '#38BDF8' : building.color;

  return (
    <group
      ref={meshRef}
      position={building.coordinates}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(building);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setInternalHover(true);
        onHover(building.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setInternalHover(false);
        onHover(null);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Base Building Block */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.2}
          metalness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Modern Glass Facade Overlay */}
      <mesh position={[0, 0, d / 2 + 0.02]}>
        <planeGeometry args={[w * 0.85, h * 0.75]} />
        <meshPhysicalMaterial
          color={isSelected ? '#60A5FA' : '#93C5FD'}
          transmission={0.6}
          opacity={0.85}
          transparent
          roughness={0.1}
          ior={1.5}
        />
      </mesh>

      {/* Building Floor Stripe Lines */}
      {Array.from({ length: building.details.floors }).map((_, idx) => {
        const stripeY = -h / 2 + ((idx + 1) * h) / (building.details.floors + 1);
        return (
          <mesh key={idx} position={[0, stripeY, d / 2 + 0.03]}>
            <planeGeometry args={[w * 0.88, 0.04]} />
            <meshBasicMaterial color="#FFFFFF" opacity={0.6} transparent />
          </mesh>
        );
      })}

      {/* Roof Accent Cap */}
      <mesh position={[0, h / 2 + 0.06, 0]}>
        <boxGeometry args={[w * 0.9, 0.12, d * 0.9]} />
        <meshStandardMaterial color={isSelected ? '#1D4ED8' : building.accentColor} roughness={0.3} />
      </mesh>

      {/* Entrance Doorway */}
      <mesh position={[0, -h / 2 + 0.4, d / 2 + 0.04]}>
        <boxGeometry args={[Math.min(0.9, w * 0.3), 0.8, 0.05]} />
        <meshStandardMaterial color="#020617" roughness={0.5} />
      </mesh>

      {/* Building Base Pedestal Pad */}
      <mesh position={[0, -h / 2 - 0.04, 0]} receiveShadow>
        <boxGeometry args={[w + 0.4, 0.08, d + 0.4]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.8} />
      </mesh>

      {/* Floating 3D Label on Hover / Selection */}
      {(activeHover || isSelected) && (
        <Html
          position={[0, h / 2 + 0.8, 0]}
          center
          distanceFactor={18}
          zIndexRange={[100, 0]}
        >
          <div className="flex flex-col items-center pointer-events-none select-none">
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap shadow-lg transition-all duration-300 flex items-center gap-1.5 ${
              isSelected
                ? 'bg-blue-600 text-white ring-2 ring-blue-400/50'
                : 'bg-slate-900/90 text-white backdrop-blur-md border border-slate-700/50'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {building.shortName.toUpperCase()}
            </div>
            <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] ${
              isSelected ? 'border-t-blue-600' : 'border-t-slate-900/90'
            }`} />
          </div>
        </Html>
      )}
    </group>
  );
}
