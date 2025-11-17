'use client';

import { Circle } from './Circle';
import type { RadialNode } from '@/types/radialNodeType';
import { PLANET_IMAGES, MOON_IMAGES } from '@/constants/images';

export const SolarNode = ({ node }: { node: RadialNode }) => {
  const image =
    node.isMoon === false
      ? PLANET_IMAGES[node.name.toLowerCase()]
      : MOON_IMAGES[node.name.toLowerCase()];
  return (
    <>
      {/* Node */}
      <div
        className="absolute"
        style={{
          left: node.x,
          top: node.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Circle label={node.name} image={image} />
      </div>

      {/* 재귀 children */}
      {node.children?.map(child => (
        <SolarNode key={child.name} node={child} />
      ))}
    </>
  );
};
