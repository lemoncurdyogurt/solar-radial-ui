// utils/convertToRadial.ts
import type { SolarHierarchy, RadialNode } from '@/types/radialNodeType';

export const convertToRadial = (solarData: SolarHierarchy): RadialNode => {
  // 태양 노드 생성
  const sunNode: RadialNode = {
    name: solarData.name,
    x: 0,
    y: 0,
    radius: 0,
    angle: 0,
    level: 0,
    isExpanded: true,
    isSelected: true,
  };

  // 행성들 생성
  if (solarData.children && solarData.children.length > 0) {

    sunNode.children = solarData.children.map(planet => {
      const planetNode: RadialNode = {
        name: planet.name,
        x: 0,
        y: 0,
        radius: 0,
        angle: 0,
        level: 1,
        parent: sunNode,
        isExpanded: false,
        isSelected: false,
        children: [],
      };

      // 위성들 생성
      if (planet.moons && planet.moons.length > 0) {
        planetNode.children = planet.moons.map(moonName => {
          return {
            name: moonName,
            x: 0,
            y: 0,
            radius: 0,
            angle: 0,
            level: 2,
            parent: planetNode,
            isMoon: true,
            isExpanded: false,
            isSelected: false,
          };
        });
      }

      return planetNode;
    });
  }
  return sunNode;
};
