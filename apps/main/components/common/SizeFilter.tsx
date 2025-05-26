import { useEffect, useState } from 'react';
import { Toggle } from '../ui/toggle';

export const SizeFilter = ({
  onSizeChange
}: {
  onSizeChange: (sizes: string[]) => void
}) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size) // Remove if already selected
        : [...prev, size] // Add if not selected
    );
  };

  // Notify parent when selected sizes change
  useEffect(() => {
    onSizeChange(selectedSizes);
  }, [selectedSizes, onSizeChange]);

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {['S', 'M', 'L'].map((size) => (
        <Toggle
          key={size}
          pressed={selectedSizes.includes(size)}
          onPressedChange={() => handleSizeToggle(size)}
          className={`cursor-pointer px-4 py-2 border rounded-md transition-colors
            ${selectedSizes.includes(size)
              ? 'bg-[#bc6c25] text-white border-[#bc6c25]'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
            }`}
          aria-label={`Size ${size}`}
        >
          {size}
        </Toggle>
      ))}
    </div>
  );
};
