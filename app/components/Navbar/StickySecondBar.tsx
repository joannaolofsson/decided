'use client';
import Link from 'next/link';
import Button from '../ui/Button';
import FilterMenu from '../FilterMenu';
import { FilterState } from '../../types/clothingItem';

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
        <div aria-label="Filters" className="sticky top-0 z-40 bg-background border-b border-neutral-200 py-4 flex justify-between items-center">
            <Link href="/addItem" className="font-medium text-sm pl-8">
                Add +
            </Link>
            <div className='pr-8'>
            <Button variant="ghost" onClick={toggleFilterMenu}>
                {showFilterMenu ? 'Close Filters' : 'Filter'}
            </Button>
            </div>

            {showFilterMenu && (
                <div className="fixed top-0 right-0 h-screen w-[300px] bg-white shadow-lg z-50 p-4 transition-transform duration-300">
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
