'use client';

import { Circle } from './Circle';
import type { RadialNode } from '@/types/radialNodeType';
import { PLANET_IMAGES, MOON_IMAGES } from '@/constants/images';

interface SolarNodeProps {
  node: RadialNode;
  centerX?: number;
  centerY?: number;
  selectedPlanet?: string | null;
  onPlanetSelect?: (planetName: string | null) => void;
}

export const SolarNode = ({
  node,
  centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
  centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
  selectedPlanet = null,
  onPlanetSelect,
}: SolarNodeProps) => {
  const handleNodeClick = (clickedNode: RadialNode) => {
    if (clickedNode.level === 1 && !selectedPlanet) {
      onPlanetSelect?.(clickedNode.name);
    } else if (clickedNode.level === 2 && selectedPlanet) {
    }
  };

  const image = node.isMoon
    ? MOON_IMAGES[node.name.toLowerCase()]
    : PLANET_IMAGES[node.name.toLowerCase()];

  // 동적으로 오비트 크기 계산
  const screenSize = Math.min(centerX, centerY);
  const sunOrbitSize = screenSize * 1.2; // 태양 주변 행성 궤도
  const planetOrbitSize = screenSize * 0.6; // 행성 주변 위성 궤도

  return (
    <>
      {/* Orbit circles - 태양 중심 모드 */}
      {node.level === 0 && !selectedPlanet && (
        <div
          className="border-opacity-30 border-pink-90/50 pointer-events-none absolute rounded-full border"
          style={{
            left: centerX - sunOrbitSize / 2,
            top: centerY - sunOrbitSize / 2,
            width: sunOrbitSize,
            height: sunOrbitSize,
          }}
        />
      )}

      {/* Orbit circles - 행성 중심 모드 */}
      {node.level === 1 && node.isSelected && (
        <div
          className="border-opacity-30 border-pink-90/50 pointer-events-none absolute rounded-full border"
          style={{
            left: centerX - planetOrbitSize / 2,
            top: centerY - planetOrbitSize / 2,
            width: planetOrbitSize,
            height: planetOrbitSize,
          }}
        />
      )}

      {/* Node */}
      <div
        className="absolute cursor-pointer transition-all duration-500 hover:scale-110"
        style={{
          left: node.x,
          top: node.y,
          transform: 'translate(-50%, -50%)',
          zIndex: node.level + 10,
        }}
        onClick={() => handleNodeClick(node)}
      >
        <Circle
          label={node.name}
          image={image}
          level={node.level}
          isSelected={node.isSelected}
        />
      </div>

      {/* 재귀 children */}
      {node.children?.map(child => (
        <SolarNode
          key={`${child.name}-${selectedPlanet}`}
          node={child}
          centerX={centerX}
          centerY={centerY}
          selectedPlanet={selectedPlanet}
          onPlanetSelect={onPlanetSelect}
        />
      ))}
    </>
  );
};
