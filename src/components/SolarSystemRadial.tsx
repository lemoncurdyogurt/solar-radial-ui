'use client';

import { solarHierarchy } from '@/constants/solarHierarchy';
import { convertToRadial } from '@/utils/convertToRadial';
import { calcSolarPositions } from '@/utils/calcSolarPositions';
import { SolarNode } from './SolarNode';

export const SolarSystemRadial = () => {
  const root = convertToRadial(solarHierarchy);

  const positioned = calcSolarPositions(root, 400, 400, 1);

  return (
    <div className="relative h-[800px] w-[800px]">
      <SolarNode node={positioned} />
    </div>
  );
};
