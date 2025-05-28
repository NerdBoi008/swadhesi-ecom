import { useCallback } from 'react'; // Import useCallback
import { Toggle } from '../ui/toggle';

interface SizeFilterProps {
  onSizeChange: (sizes: string[]) => void;
  currentSelectedSizes: string[];
}

export const SizeFilter = ({
  onSizeChange,
  currentSelectedSizes,
}: SizeFilterProps) => {

  const handleSizeToggle = useCallback((size: string) => {
    const isSelected = currentSelectedSizes.includes(size);
    let newSizes: string[];

    if (isSelected) {
      // Remove if already selected
      newSizes = currentSelectedSizes.filter(s => s !== size);
    } else {
      // Add if not selected
      newSizes = [...currentSelectedSizes, size];
    }
    // Directly call the parent's callback with the new state
    onSizeChange(newSizes);
  }, [currentSelectedSizes, onSizeChange]); // Dependencies for useCallback are important

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
        <Toggle
          key={size}
          // The 'pressed' state directly reflects the parent's prop
          pressed={currentSelectedSizes.includes(size)}
          onPressedChange={() => handleSizeToggle(size)} // Calls the debounced handler
          className={`cursor-pointer px-4 py-2 border rounded-md transition-colors
            ${currentSelectedSizes.includes(size)
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