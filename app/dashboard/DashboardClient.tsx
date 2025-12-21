"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "../components/ui/Card";
import ItemModal from "../components/ItemModal";
import Button from "../components/ui/Button";
import Link from "next/link";
import { ClothingItem } from "../types/clothingItem";
import FilterMenu from "../components/FilterMenu";

export default function DashboardClient() {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [allItems, setAllItems] = useState<ClothingItem[]>([]);
  const [filters, setFilters] = useState({
    owned: null as boolean | null, // null = all, true = owned, false = wishlist
    brand: "",                     // "" = all brands
    maxPrice: Infinity             // optional: set a number like 100
  });
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesOwned =
        filters.owned === null || item.owned === filters.owned;

      const matchesBrand =
        !filters.brand || item.brand.toLowerCase() === filters.brand.toLowerCase();

      const matchesPrice =
        item.price === undefined || item.price <= filters.maxPrice;

      return matchesOwned && matchesBrand && matchesPrice;
    });
  }, [allItems, filters]);


  const router = useRouter()
  const sp = useSearchParams()
  const openId = sp.get("item");

  const handleCardClick = (id: number) => {
    router.push(`/dashboard?item=${id}`);
  };

  const handleCloseModal = () => {
    router.push("/dashboard");
  };

  const handlecloseFilterMenu = () => {
    setShowFilterMenu(false);
  };

  useEffect(() => {
    fetch('/api/items')
      .then(async res => {
        const text = await res.text();
        const data = JSON.parse(text);
        setAllItems(data); // ✅ store full wardrobe
        // ❌ don't call setFilters(data)
      })
      .catch(err => console.error("JSON error:", err));
  }, []);


  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-4xl self-center">My decided Wardrobe</h1>

      <div className="flex flex-row justify-between">
        <Link href="/addItem">Add +</Link>
        <Button variant="ghost" onClick={() => setShowFilterMenu(!showFilterMenu)}>
          {showFilterMenu ? "Close Filters" : "Filter"}
        </Button>

      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            brand={item.brand}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>

      {openId && (
        <ItemModal
          id={openId}
          data={allItems.find((i) => i.id === Number(openId))}
          onClose={handleCloseModal}
        />
      )}

      {showFilterMenu && (
        <div className="fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 p-6 transition-transform duration-300">
          <FilterMenu
            filters={filters}
            setFilters={setFilters}
            availableBrands={[...new Set(allItems.map(item => item.brand))]}
            onApply={() => setShowFilterMenu(false)}
            onReset={() => setFilters({ owned: null, brand: "", maxPrice: Infinity })}
            onClose={handlecloseFilterMenu}
          />
        </div>
      )}
    </div>
  );
}
