'use client';

import React from 'react';
import * as THREE from 'three';

// Low-poly round tree model
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
        <meshStandardMaterial color="#78350F" roughness={0.9} />
      </mesh>
      {/* Foliage Canopy (double-tier low poly sphere/cone) */}
      <mesh castShadow position={[0, 1.1, 0]}>
        <dodecahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#10B981" roughness={0.5} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.5, 0]}>
        <dodecahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial color="#34D399" roughness={0.5} flatShading />
      </mesh>
    </group>
  );
}

// Minimal modern lamp post
function LampPost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#FDE047" />
      </mesh>
    </group>
  );
}

export function CampusEnvironment() {
  const treePositions: [number, number, number][] = [
    [-8, 0, 8], [-7, 0, 6], [7, 0, 7], [8, 0, 9],
    [-8, 0, -1], [-9, 0, 2], [8, 0, 0], [9, 0, -2],
    [-2.5, 0, 5], [2.5, 0, 5], [-2.5, 0, 0], [2.5, 0, 0],
    [-7.5, 0, -8], [-8.5, 0, -6], [7.5, 0, -8], [8.5, 0, -6],
    [-2, 0, -8], [2, 0, -8]
  ];

  const lampPositions: [number, number, number][] = [
    [-1.8, 0, 7], [1.8, 0, 7],
    [-1.8, 0, 3], [1.8, 0, 3],
    [-1.8, 0, -2], [1.8, 0, -2],
    [-4, 0, 3], [4, 0, 3],
    [-4, 0, -4.5], [4, 0, -4.5]
  ];

  return (
    <group>
      {/* Main Ground Plane */}
      <mesh receiveShadow position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#F1F5F9" roughness={0.9} />
      </mesh>

      {/* Main Entrance Driveway Road */}
      <mesh receiveShadow position={[0, 0.01, 8.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 5]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
      </mesh>

      {/* Central Campus Plaza Walkway */}
      <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 12]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>

      {/* East-West Crosswalk Paths to Blocks */}
      <mesh receiveShadow position={[0, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 2.6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>
      <mesh receiveShadow position={[0, 0.01, -4.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 2.6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>

      {/* Central Lawn Circle */}
      <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 32]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
      </mesh>

      {/* Central Fountain / Water Feature Base */}
      <mesh receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.16, 24]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.02, 24]} />
        <meshPhysicalMaterial color="#38BDF8" roughness={0.1} transmission={0.7} transparent opacity={0.9} />
      </mesh>

      {/* Trees Array */}
      {treePositions.map((pos, i) => (
        <Tree key={i} position={pos} scale={0.85 + (i % 3) * 0.15} />
      ))}

      {/* Lamp Posts */}
      {lampPositions.map((pos, i) => (
        <LampPost key={i} position={pos} />
      ))}
    </group>
  );
}
