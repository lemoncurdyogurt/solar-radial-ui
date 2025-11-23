export interface RadialNode {
  name: string;
  x: number;
  y: number;
  radius: number;
  angle: number;
  isMoon?: boolean;
  children?: RadialNode[];
  level: number;
  parent?: RadialNode;
  isExpanded?: boolean;
  isSelected?: boolean; // 추가
}

export interface SolarHierarchy {
  name: string;
  children?: SolarHierarchy[];
  moons?: string[];
}
