export interface RadialNode {
  name: string;
  image?: string;
  angleDeg?: number;
  distanceRatio?: number;
  isMoon?: boolean;
  children?: RadialNode[];
  x?: number;
  y?: number;
  deg?: number;
}
