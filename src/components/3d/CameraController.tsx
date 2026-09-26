'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { BuildingData } from '@/data/campusData';

interface CameraControllerProps {
  selectedBuilding: BuildingData | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 14, 18);
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);

export function CameraController({ selectedBuilding, controlsRef }: CameraControllerProps) {
  const { camera } = useThree();
  const targetCamPos = useRef(DEFAULT_CAMERA_POS.clone());
  const targetLookAt = useRef(DEFAULT_TARGET.clone());
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (selectedBuilding) {
      const [x, y, z] = selectedBuilding.coordinates;
      // Position camera offset to view building comfortably
      targetCamPos.current.set(x + 3.5, y + 4.5, z + 7);
      targetLookAt.current.set(x, y + 0.5, z);
      isTransitioning.current = true;
    } else {
      targetCamPos.current.copy(DEFAULT_CAMERA_POS);
      targetLookAt.current.copy(DEFAULT_TARGET);
      isTransitioning.current = true;
    }
  }, [selectedBuilding]);

  useFrame((_, delta) => {
    if (!isTransitioning.current) return;

    // Smooth lerp camera position
    camera.position.lerp(targetCamPos.current, delta * 3.5);

    if (controlsRef.current) {
      // Smooth lerp orbit controls target
      controlsRef.current.target.lerp(targetLookAt.current, delta * 3.5);
      controlsRef.current.update();
    }

    // Check if arrived close enough
    if (
      camera.position.distanceTo(targetCamPos.current) < 0.05 &&
      (!controlsRef.current || controlsRef.current.target.distanceTo(targetLookAt.current) < 0.05)
    ) {
      isTransitioning.current = false;
    }
  });

  return null;
}
