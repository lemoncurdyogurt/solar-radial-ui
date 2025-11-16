import { calcRadialPositions } from './calcRadialPositions';
import type { RadialNode } from '@/types/radialNodeType';

export const calcSolarPositions = (
  node: RadialNode,
  cx: number,
  cy: number,
  depth: number,
): RadialNode => {
  const radiusStep = 150;
  const radius = depth * radiusStep;

  const children = node.children ?? [];

  // 이 depth의 원형 배치 계산
  const placed = calcRadialPositions(children, {
    centerX: cx,
    centerY: cy,
    radius,
  });

  // 각 child를 재귀적으로 깊게 탐색
  const withChildren = placed.map(child =>
    calcSolarPositions(child, child.x!, child.y!, depth + 1),
  );

  return {
    ...node,
    x: cx,
    y: cy,
    children: withChildren,
  };
};
