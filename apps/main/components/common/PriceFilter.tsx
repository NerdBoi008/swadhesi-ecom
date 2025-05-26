import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';

interface PriceFilterProps {
  minPriceBound: number; // The absolute minimum possible price (e.g., 0)
  maxPriceBound: number; // The absolute maximum possible price across all products
  onPriceRangeChange: (min: number, max: number) => void; // Callback with selected range
}

export const PriceFilter = ({
  minPriceBound,
  maxPriceBound,
  onPriceRangeChange,
}: PriceFilterProps) => {
  // State for the selected min/max values in this component
  const [minPrice, setMinPrice] = useState<number>(minPriceBound);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceBound);

  // State specifically for the slider thumbs to handle intermediate values during slide
  // Initialize with the bounds
  const [sliderValues, setSliderValues] = useState<[number, number]>([minPriceBound, maxPriceBound]);

  // --- IMPORTANT: Update internal state if bounds change ---
  // This handles cases where the available products/prices change externally
  useEffect(() => {
      // Reset local state and slider if the external bounds change significantly
      // You might add more complex logic here if needed
      setMinPrice(minPriceBound);
      setMaxPrice(maxPriceBound);
      setSliderValues([minPriceBound, maxPriceBound]);
  }, [minPriceBound, maxPriceBound]);


  // --- Effect to report changes back to the parent ---
  // Debouncing can be useful here if updates are too frequent during slider drag
  useEffect(() => {
      onPriceRangeChange(minPrice, maxPrice);
      // This effect runs when the selected min/max price changes
  }, [minPrice, maxPrice, onPriceRangeChange]); // Include onPriceRangeChange for correctness, ensure parent memoizes it

  // --- Handlers ---

  // Use useCallback for handlers passed to inputs/sliders if they have complex logic
  // or if PriceFilter becomes more complex causing re-renders. For simple setters, it's often optional.

  // Called when slider thumbs are moved (potentially frequently)
  const handleSliderValueChange = (values: number[]) => {
      // Update slider visual state immediately
      setSliderValues([values[0], values[1]]);
      // You could debounce the state update here if needed, but often
      // updating the actual filter state (minPrice, maxPrice) on commit is better.
  };

  // Called when slider interaction finishes (on commit)
  const handleSliderCommit = (values: number[]) => {
      setMinPrice(values[0]);
      setMaxPrice(values[1]);
      // The useEffect above will trigger the onPriceRangeChange callback
  };


  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = Number(e.target.value);
      // Clamp value: cannot be negative or greater than current maxPrice
      value = Math.max(minPriceBound, Math.min(value, maxPrice));
      setMinPrice(value);
      setSliderValues([value, maxPrice]); // Keep slider visual in sync
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = Number(e.target.value);
       // Clamp value: cannot be less than current minPrice or greater than overall bound
      value = Math.min(maxPriceBound, Math.max(value, minPrice));
      setMaxPrice(value);
      setSliderValues([minPrice, value]); // Keep slider visual in sync
  };

  // Calculate a rounded max for display/slider range if needed, based on bounds
  // Note: Use maxPriceBound for the slider's max limit
  const displayMax = Math.ceil(maxPriceBound / 100) * 100; // Example rounding

  return (
    <div className='my-5'>
        <p className="text-sm text-gray-600 mb-2">
            Selected range: ₹{minPrice} - ₹{maxPrice}
        </p>
      <Slider
        // Use value for controlled component based on sliderValues state
        value={sliderValues}
        // Use onValueChange for immediate visual feedback during drag
        onValueChange={handleSliderValueChange}
        // Use onValueCommit to update the actual filter state (minPrice, maxPrice)
        onValueCommit={handleSliderCommit}
        min={minPriceBound}
        max={maxPriceBound} // Use the actual max bound for slider range
        step={1} // Adjust step as needed (e.g., 1, 10, 50)
        minStepsBetweenThumbs={1} // Optional: ensure min/max don't cross
      >
        {/* Assuming ShadCN UI Slider structure which handles Track/Range/Thumb */}
        {/* If using Radix directly, you'd have SliderTrack, SliderRange, SliderThumb here */}
      </Slider>

      <div className='flex gap-5 mt-5'>
        <div>
          <label htmlFor="min-price-input" className="text-sm">Min Price (₹)</label>
          <Input
            id="min-price-input"
            type="number"
            value={minPrice}
            onChange={handleMinInputChange}
            min={minPriceBound}
            max={maxPrice} // Dynamic max based on current maxPrice state
            step={10} // Optional: step for input arrows
          />
        </div>
        <div>
          <label htmlFor="max-price-input" className="text-sm">Max Price (₹)</label>
          <Input
            id="max-price-input"
            type="number"
            value={maxPrice}
            onChange={handleMaxInputChange}
            min={minPrice} // Dynamic min based on current minPrice state
            max={maxPriceBound} // Absolute max bound
            step={10} // Optional: step for input arrows
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Available range: ₹{minPriceBound} - ₹{maxPriceBound}
      </p>
    </div>
  );
};