import { useState } from 'react';

interface CircleProps {
  image?: string;
  label?: string;
  level: number;
  isSelected?: boolean;
}

export const Circle = ({
  image,
  label,
  level,
  isSelected = false,
}: CircleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSize = () => {
    if (level === 0) return 'h-28 w-28 md:h-32 md:w-32'; // 태양
    if (level === 1) return 'h-16 w-16 md:h-20 md:w-20'; // 행성
    return 'h-10 w-10 md:h-12 md:w-12'; // 위성
  };

  const getBorder = () => {
    if (isSelected) return 'border border-pink-90';
    if (level === 0) return 'border border-pink-90 shadow-lg shadow-pink-90/30';
    return 'border border-pink-90/30';
  };

  const getGlow = () => {
    if (level === 0) return 'animate-pulse';
    return '';
  };

  return (
    <div
      className={`relative transition-all duration-300 ${getSize()} ${getGlow()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <img
          src={image}
          alt={label}
          className={`h-full w-full rounded-full object-cover ${getBorder()} transition-all duration-300`}
        />
      ) : (
        <div
          className={`bg-gray-5 flex h-full w-full items-center justify-center rounded-full ${getBorder()}`}
        >
          <span className="text-lab-md text-gray-99">No Image</span>
        </div>
      )}

      {/* 호버 시 레이블 */}
      {isHovered && label && (
        <div className="bg-gray-5/90 text-cap-sm text-gray-99 absolute -top-8 left-20 z-50 -translate-x-1/2 rounded-lg px-3 py-1 whitespace-nowrap backdrop-blur-sm">
          {label}
          <div className="bg-gray-5/90 absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"></div>
        </div>
      )}

      {/* 선택된 노드 표시 */}
      {isSelected && (
        <div className="border-pink-50 absolute -inset-3 animate-ping rounded-full border"></div>
      )}
    </div>
  );
};
