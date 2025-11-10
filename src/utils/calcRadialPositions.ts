import type { RadialNode } from '@/types/radialNodeType';

interface CalcRadialOptions {
  centerX: number;
  centerY: number;
  radius: number;
}
export const calcRadialPositions = (
  nodes: RadialNode[],
  { centerX, centerY, radius }: CalcRadialOptions,
) => {
  const n = nodes.length;
  return nodes.map((node, i) => {
    const deg =
      node.angleDeg !== undefined ? node.angleDeg : n === 1 ? 0 : (360 / n) * i;

    const rad = (deg * Math.PI) / 180;
    const dist = (node.distanceRatio ?? 1) * radius;
    const x = centerX + Math.cos(rad) * dist;
    const y = centerY + Math.sin(rad) * dist;

    return { ...node, x, y, deg };
  });
};
