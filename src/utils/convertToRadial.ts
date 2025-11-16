import type { RadialNode } from '@/types/radialNodeType';

export const convertToRadial = (node: any): RadialNode => {
  return {
    name: node.name,
    children: [
      // 행성 children
      ...(node.children?.map(convertToRadial) ?? []),

      // moons → 동일 계층 children으로 추가
      ...(node.moons?.map((moon: string) => ({
        name: moon,
        isMoon: true,
        children: [],
      })) ?? []),
    ],
  };
};
