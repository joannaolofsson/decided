'use client';
import { useState } from 'react';
import Button from './ui/Button';
import { FilterState } from '../types/clothingItem';
import { PiX, PiCaretDown, PiCaretUp } from "react-icons/pi";

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
          <PiX />
        </Button>
      </div>

      <h3 className="text-md font-normal pb-4">Filter by</h3>

      {/* Brand Filter */}
      <div className="border-b border-[var(--divider)] pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown("brand")}
        >
          <h4 className="text-md font-normal">Brand</h4>
          <span className="text-xl pr-4">
            {dropdownOpen === "brand" ? <PiCaretUp /> : <PiCaretDown />}
          </span>
        </div>



        {dropdownOpen === "brand" && (
          <div className="mt-4 flex flex-wrap gap-2">
            {availableBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setFilters({ ...filters, brand })}
                className={`px-3 py-1 border border-[#cbd1d8] text-sm ${filters.brand === brand ? "bg-[#dddddd] text-foreground" : "bg-transparent text-foreground"
                  }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Owned Filter */}

      <div className="border-b border-[var(--divider)] pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown("owned")}
        >
          <h4 className="text-md font-normal">Owned</h4>
          <span className="text-xl pr-4">
            {dropdownOpen === "owned" ? <PiCaretUp /> : <PiCaretDown />}
          </span>
        </div>


        {dropdownOpen === "owned" && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setFilters({ ...filters, owned: true })}
              className={`px-3 py-1 border border-[#cbd1d8] text-sm ${filters.owned === true ? "bg-[#dddddd] text-foreground" : "bg-transparent text-foreground"
                }`}
            >
              Owned
            </button>
            <button
              onClick={() => setFilters({ ...filters, owned: false })}
              className={`px-3 py-1 border border-[#cbd1d8] text-sm ${filters.owned === false ? "bg-[#dddddd] text-foreground" : "bg-transparent text-foreground"
                }`}
            >
              Wishlist
            </button>
            <button
              onClick={() => setFilters({ ...filters, owned: null })}
              className={`px-3 py-1 border border-[#cbd1d8] text-sm ${filters.owned === null ? "bg-[#dddddd] text-foreground" : "bg-transparent text-foreground"
                }`}
            >
              All
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-[var(--divider)] pb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleDropdown("price")}
        >
          <h4 className="text-md font-normal">Price</h4>
          <span className="text-xl pr-4">
            {dropdownOpen === "price" ? <PiCaretUp /> : <PiCaretDown />}
          </span>
        </div>

        {dropdownOpen === "price" && (
          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={filters.maxPrice === Infinity ? 1000 : filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: Number(e.target.value) })
              }
              className="
                    w-full
                    appearance-none
                    [&::-webkit-slider-runnable-track]:h-2         
                    [&::-webkit-slider-runnable-track]:bg-[#C084FC]/30
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:bg-[#C084FC]
                    [&::-webkit-slider-thumb]:mt-[-4px]   /* <-- THIS fixes the vertical alignment */
                  "
            />


            <p className="text-sm mt-1">
              Maximum:  {filters.maxPrice === Infinity ? "∞" : `SEK ${filters.maxPrice}`}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <Button variant="glass" onClick={onReset}>
          Reset
        </Button>
        <Button variant="secondary" onClick={onApply}>Apply</Button>
      </div>
    </div>
  );
}
