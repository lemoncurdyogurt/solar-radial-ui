interface CircleProps {
  isFocused?: boolean;
  image?: string;
  label?: string;
}
export const Circle = ({ isFocused = false, image, label }: CircleProps) => {
  return (
    <div
      className={`${isFocused ? 'h-[300px] w-[300px]' : 'h-[200px] w-[200px]'}`}
    >
      {image && (
        <img src={image} alt={label} className="h-full w-full object-cover" />
      )}
      {label && (
        <span className="bg-opacity-50 text-gray-5 bg-gray-99 absolute bottom-2 rounded px-1">
          {label}
        </span>
      )}
    </div>
  );
};
