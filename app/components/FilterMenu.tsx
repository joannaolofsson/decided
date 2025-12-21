'use client';
import { useState } from 'react';
import Button from './ui/Button';
import { FilterState } from '../types/clothingItem';

interface FilterMenuProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  availableBrands: string[];
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
}

export default function FilterMenu({
  filters,
  setFilters,
  availableBrands,
  onApply,
  onReset,
  onClose,
}: FilterMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState<"brand" | "owned" | "price" | null>(null);

  const toggleDropdown = (key: typeof dropdownOpen) => {
    setDropdownOpen(dropdownOpen === key ? null : key);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button aria-label="Close" onClick={onClose} variant="ghost">
          ✕
        </Button>
      </div>

      <h3 className="text-lg font-semibold">Filter by</h3>

      {/* Brand Filter */}
      <div className="border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown("brand")}
        >
          <h4 className="text-md font-medium">Brand</h4>
          <span className="text-xl">{dropdownOpen === "brand" ? "▲" : "▼"}</span>
        </div>

        {dropdownOpen === "brand" && (
          <div className="mt-2 flex flex-wrap gap-2">
            {availableBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setFilters({ ...filters, brand })}
                className={`px-3 py-1 rounded-full border ${
                  filters.brand === brand ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Owned Filter */}
      <div className="border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown("owned")}
        >
          <h4 className="text-md font-medium">Owned</h4>
          <span className="text-xl">{dropdownOpen === "owned" ? "▲" : "▼"}</span>
        </div>

        {dropdownOpen === "owned" && (
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setFilters({ ...filters, owned: true })}
              className={`px-3 py-1 rounded-full border ${
                filters.owned === true ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              ✅ Owned
            </button>
            <button
              onClick={() => setFilters({ ...filters, owned: false })}
              className={`px-3 py-1 rounded-full border ${
                filters.owned === false ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              🛒 Wishlist
            </button>
            <button
              onClick={() => setFilters({ ...filters, owned: null })}
              className={`px-3 py-1 rounded-full border ${
                filters.owned === null ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              All
            </button>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown("price")}
        >
          <h4 className="text-md font-medium">Price</h4>
          <span className="text-xl">{dropdownOpen === "price" ? "▲" : "▼"}</span>
        </div>

        {dropdownOpen === "price" && (
          <div className="mt-2">
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={filters.maxPrice === Infinity ? 1000 : filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: Number(e.target.value) })
              }
              className="w-full"
            />
            <p className="text-sm mt-1">
              Max: {filters.maxPrice === Infinity ? "∞" : `€${filters.maxPrice}`}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
        <Button onClick={onApply}>Apply</Button>
      </div>
    </div>
  );
}
