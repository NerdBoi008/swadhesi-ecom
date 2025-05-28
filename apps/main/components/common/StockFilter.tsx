// import { useState, useEffect, useMemo } from 'react';
// import { Checkbox } from '../ui/checkbox';
// import { Product } from '@repo/types';

// // Possible stock statuses the filter can report
// export type StockStatus = 'all' | 'inStock' | 'outOfStock';

// interface StockFilterProps {
//   originalProducts: Readonly<Product[]>;
//   onStockStatusChange: (status: StockStatus) => void;
// }

// export const StockFilter = ({
//   originalProducts,
//   onStockStatusChange,
// }: StockFilterProps) => {
//   // State for the checkboxes
//   const [showInStock, setShowInStock] = useState<boolean>(false);
//   const [showOutOfStock, setShowOutOfStock] = useState<boolean>(false);

//   // Calculate counts based on the original product list
//   // Use useMemo for the optimization if originalProducts could be large
//   const counts = useMemo(() => {
//     if (!originalProducts) return { inStock: 0, outOfStock: 0 };
//     let inStock = 0;
//     originalProducts.forEach(p => {
//       if (typeof p.variants?.[0]?.stock === 'number' && p.stock > 0) {
//         inStock++;
//       }
//     });
//     return {
//       inStock: inStock,
//       outOfStock: originalProducts.length - inStock,
//     };
//   }, [originalProducts]);

//   // Effect to determine and report the desired status based on check state
//   useEffect(() => {
//     let status: StockStatus = 'all';
//     if (showInStock && !showOutOfStock) {
//       status = 'inStock';
//     } else if (!showInStock && showOutOfStock) {
//       status = 'outOfStock';
//     }
//     // If both are true or both are false, status remains 'all'

//     onStockStatusChange(status);
//   }, [onStockStatusChange, showInStock, showOutOfStock]);
  
//   // --- Handlers ---
//   const handleInStockChange = (checked: boolean | 'indeterminate') => {
//     setShowInStock(Boolean(checked));
//   }

//   const handleOutOfStockChange = (checked: boolean | 'indeterminate') => {
//     setShowOutOfStock(Boolean(checked));
//   };
  

//   return (
//     <div className="space-y-3 my-5"> {/* Added margin like PriceFilter */}
//       <div className="flex items-center space-x-2">
//         <Checkbox
//           id="inStock"
//           checked={showInStock}
//           onCheckedChange={handleInStockChange}
//           aria-labelledby="inStock-label"
//         />
//         <label  htmlFor="inStock" className="text-sm font-medium leading-none cursor-pointer">
//           In stock [{counts.inStock}]
//         </label>
//       </div>

//       <div className="flex items-center space-x-2">
//         <Checkbox
//           id="outOfStock"
//           checked={showOutOfStock}
//           onCheckedChange={handleOutOfStockChange}
//           aria-labelledby="outOfStock-label"
//         />
//         <label htmlFor="outOfStock" className="text-sm font-medium leading-none cursor-pointer">
//           Out of stock [{counts.outOfStock}]
//         </label>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect, useMemo } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Product } from '@repo/types';

// Possible stock statuses the filter can report
export type StockStatus = 'all' | 'inStock' | 'outOfStock';

interface StockFilterProps {
  originalProducts: Readonly<Product[]>;
  onStockStatusChange: (status: StockStatus) => void;
  currentStockStatus: StockStatus; // Added to control initial checkbox state
}

export const StockFilter = ({
  originalProducts,
  onStockStatusChange,
  currentStockStatus, // Destructure the new prop
}: StockFilterProps) => {
  // State for the checkboxes, now initialized based on currentStockStatus
  const [showInStock, setShowInStock] = useState<boolean>(currentStockStatus === 'inStock' || currentStockStatus === 'all');
  const [showOutOfStock, setShowOutOfStock] = useState<boolean>(currentStockStatus === 'outOfStock' || currentStockStatus === 'all');

  // Calculate counts based on the original product list
  const counts = useMemo(() => {
    if (!originalProducts) return { inStock: 0, outOfStock: 0 };
    let inStockCount = 0;
    let outOfStockCount = 0;

    originalProducts.forEach(p => {
      // Access stock from the first variant as per your previous logic
      const stock = p.variants?.[0]?.stock;
      if (typeof stock === 'number') {
        if (stock > 0) {
          inStockCount++;
        } else {
          outOfStockCount++;
        }
      }
    });
    return {
      inStock: inStockCount,
      outOfStock: outOfStockCount,
    };
  }, [originalProducts]);

  // Effect to determine and report the desired status based on check state
  useEffect(() => {
    let status: StockStatus = 'all';
    if (showInStock && !showOutOfStock) {
      status = 'inStock';
    } else if (!showInStock && showOutOfStock) {
      status = 'outOfStock';
    }
    // If both are true or both are false, status remains 'all' (this is the default behavior)

    onStockStatusChange(status);
  }, [onStockStatusChange, showInStock, showOutOfStock]);
  
  // Effect to reset checkbox states when the parent component signals a reset
  // (e.g., via filterResetKey in ProductsDisplayPage)
  useEffect(() => {
    setShowInStock(currentStockStatus === 'inStock' || currentStockStatus === 'all');
    setShowOutOfStock(currentStockStatus === 'outOfStock' || currentStockStatus === 'all');
  }, [currentStockStatus]); // Depend on currentStockStatus from props

  // --- Handlers ---
  const handleInStockChange = (checked: boolean | 'indeterminate') => {
    setShowInStock(Boolean(checked));
    // If "In stock" is checked, uncheck "Out of stock" to ensure mutual exclusivity
    if (checked) {
      setShowOutOfStock(false);
    }
  }

  const handleOutOfStockChange = (checked: boolean | 'indeterminate') => {
    setShowOutOfStock(Boolean(checked));
    // If "Out of stock" is checked, uncheck "In stock"
    if (checked) {
      setShowInStock(false);
    }
  };
  

  return (
    <div className="space-y-3 my-5">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={showInStock}
          onCheckedChange={handleInStockChange}
          aria-labelledby="inStock-label"
        />
        <label htmlFor="inStock" className="text-sm font-medium leading-none cursor-pointer">
          In stock [{counts.inStock}]
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="outOfStock"
          checked={showOutOfStock}
          onCheckedChange={handleOutOfStockChange}
          aria-labelledby="outOfStock-label"
        />
        <label htmlFor="outOfStock" className="text-sm font-medium leading-none cursor-pointer">
          Out of stock [{counts.outOfStock}]
        </label>
      </div>
    </div>
  );
};