'use client';
import Link from 'next/link';
import Button from '../ui/Button';
import FilterMenu from '../FilterMenu';
import { FilterState } from '../../types/clothingItem';
import { PiSlidersHorizontalFill, PiPlusBold } from "react-icons/pi";

interface StickySecondBarProps {
    showFilterMenu: boolean;
    setShowFilterMenu: (value: boolean) => void;
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    availableBrands: string[];
}

export default function StickySecondBar({
    showFilterMenu,
    setShowFilterMenu,
    filters,
    setFilters,
    availableBrands,
}: StickySecondBarProps) {
    const toggleFilterMenu = () => setShowFilterMenu(!showFilterMenu);

    // const handlecloseFilterMenu = () => {
    //setShowFilterMenu(false);
    //};

    return (
        <div aria-label="Filters" className="sticky top-0 bg-background border-b border-neutral-200 py-4 flex justify-between items-center">
            <Link href="/addItem" className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed ml-8 bg-[#A5F3FC] text-foreground hover:bg-[#aef4fc] px-3 py-1.5 text-sm">
                Add <PiPlusBold size="1.1rem" className='pl-1' />
            </Link>
            <div className='pr-4 md:pr-8'> 
            <Button variant="ghost" onClick={toggleFilterMenu}><PiSlidersHorizontalFill size="1.5rem" className='pr-1'/>
                {showFilterMenu ? 'Close Filters' : 'Filter'}
            </Button>
            </div>

            {showFilterMenu && (
                <div className="fixed top-0 right-0 h-screen w-[300px] bg-white shadow-lg z-[100] p-4 transition-transform duration-300">
                    <FilterMenu
                        filters={filters}
                        setFilters={setFilters}
                        availableBrands={availableBrands}
                        onApply={() => setShowFilterMenu(false)}
                        onReset={() => setFilters({ owned: null, brand: '', maxPrice: Infinity })}
                        onClose={() => setShowFilterMenu(false)}
                    />
                </div>
            )}

        </div>
    );
}
