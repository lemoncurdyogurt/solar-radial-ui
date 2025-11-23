// utils/calcSolarPositions.ts
import type { RadialNode } from '@/types/radialNodeType';

export const calcSolarPositions = (
  node: RadialNode,
  centerX: number,
  centerY: number,
  selectedPlanet: string | null = null,
): RadialNode => {
  const positionedNode = { ...node };

  // 화면 크기에 기반한 거리 계산 (화면 전체 기준)
  const screenSize = Math.min(centerX, centerY);
  const planetRadius = screenSize * 0.6; // 화면 크기의 60%
  const moonRadius = screenSize * 0.3; // 화면 크기의 30%

  // 행성이 선택된 경우
  if (selectedPlanet) {
    if (positionedNode.name === selectedPlanet && positionedNode.level === 1) {
      // 선택된 행성: 중앙에 배치

      positionedNode.x = centerX;
      positionedNode.y = centerY;
      positionedNode.isSelected = true;

      // 위성들 배치 (위성이 있는 경우)
      if (positionedNode.children && positionedNode.children.length > 0) {
        positionedNode.children = positionedNode.children.map((moon, index) => {
          const moonCount = positionedNode.children!.length;

          // 위성이 한 개인 경우 12시 방향에 배치
          const angle =
            moonCount === 1
              ? -Math.PI / 2 // 12시 방향
              : (2 * Math.PI * index) / moonCount;

          const moonX = centerX + moonRadius * Math.cos(angle);
          const moonY = centerY + moonRadius * Math.sin(angle);

          return {
            ...moon,
            x: moonX,
            y: moonY,
            radius: moonRadius,
            angle: angle,
            isSelected: false,
          };
        });
      }
    } else if (positionedNode.level === 0) {
      // 태양: 숨기기
      positionedNode.x = -1000;
      positionedNode.y = -1000;
      positionedNode.isSelected = false;
    } else if (
      positionedNode.level === 1 &&
      positionedNode.name !== selectedPlanet
    ) {
      // 다른 행성들: 숨기기
      positionedNode.x = -1000;
      positionedNode.y = -1000;
      positionedNode.isSelected = false;
      if (positionedNode.children) {
        positionedNode.children = positionedNode.children.map(moon => ({
          ...moon,
          x: -1000,
          y: -1000,
        }));
      }
    }
  }
  // 태양 중심 모드
  else {
    if (positionedNode.level === 0) {
      // 태양: 중앙에 배치
      positionedNode.x = centerX;
      positionedNode.y = centerY;
      positionedNode.isSelected = true;

      // 행성들 배치
      if (positionedNode.children && positionedNode.children.length > 0) {
        positionedNode.children = positionedNode.children.map(
          (planet, index) => {
            const planetCount = positionedNode.children!.length;
            const angle = (2 * Math.PI * index) / planetCount - Math.PI / 2;

            const planetX = centerX + planetRadius * Math.cos(angle);
            const planetY = centerY + planetRadius * Math.sin(angle);

            return {
              ...planet,
              x: planetX,
              y: planetY,
              radius: planetRadius,
              angle: angle,
              isSelected: false,
              // 위성들은 숨기기
              children: planet.children
                ? planet.children.map(moon => ({
                    ...moon,
                    x: -1000,
                    y: -1000,
                  }))
                : [],
            };
          },
        );
      }
    }
  }

  // children 재귀 처리
  if (positionedNode.children) {
    positionedNode.children = positionedNode.children.map(child =>
      calcSolarPositions(child, centerX, centerY, selectedPlanet),
    );
  }

  return positionedNode;
};
