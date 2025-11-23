'use client';

import { useState, useEffect } from 'react';
import { solarHierarchy } from '@/constants/solarHierarchy';
import { convertToRadial } from '@/utils/convertToRadial';
import { calcSolarPositions } from '@/utils/calcSolarPositions';
import { SolarNode } from './SolarNode';

export const SolarSystemRadial = () => {
  const [rootNode, setRootNode] = useState<any>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  // 화면 전체 크기 사용
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  useEffect(() => {
    try {
      const radialRoot = convertToRadial(solarHierarchy);
      const positioned = calcSolarPositions(
        radialRoot,
        centerX,
        centerY,
        selectedPlanet,
      );
      setRootNode(positioned);
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }, [selectedPlanet, screenWidth, screenHeight, centerX, centerY]);

  const handleBackToSun = () => {
    setSelectedPlanet(null);
  };

  const handlePlanetSelect = (planetName: string | null) => {
    setSelectedPlanet(planetName);
  };

  if (!rootNode) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-heading text-gray-99">
          Initializing Solar System...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-5 relative h-screen w-screen">
      {/* 컨트롤 패널 */}
      <div className="absolute top-6 left-6 z-50 flex flex-col gap-3">
        {/* 백 버튼 (행성 선택 시에만 표시) */}
        {selectedPlanet && (
          <button
            onClick={handleBackToSun}
            className="border-gray-40 bg-gray-40 text-lab-lg text-gray-99 hover:bg-gray-30 rounded-lg border px-5 py-2 transition-colors duration-200"
          >
            ← Back to Sun
          </button>
        )}

        {/* 현재 보기 모드 표시 */}
        <div className="border-gray-20 bg-gray-20/80 text-lab-lg text-gray-99 rounded-lg border px-5 py-2">
          {selectedPlanet
            ? `Viewing: ${selectedPlanet}`
            : 'Viewing: Sun Center'}
        </div>
      </div>

      <SolarNode
        key={`solar-root-${selectedPlanet}`}
        node={rootNode}
        centerX={centerX}
        centerY={centerY}
        selectedPlanet={selectedPlanet}
        onPlanetSelect={handlePlanetSelect}
      />
    </div>
  );
};
