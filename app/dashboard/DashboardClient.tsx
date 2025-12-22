"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "../components/ui/Card";
import ItemModal from "../components/ItemModal";
import { ClothingItem } from "../types/clothingItem";
import StickySecondBar from "../components/Navbar/StickySecondBar";


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
    <div className="flex flex-col gap-8">
      <h1 className="self-center font-serif text-2xl md:text-[clamp(2.25rem,3vw,3rem)] font-normal tracking-normal text-foreground p-4">My decided Wardrobe</h1>
      <StickySecondBar 
      showFilterMenu={showFilterMenu} 
      setShowFilterMenu={setShowFilterMenu} 
      filters={filters} 
      setFilters={setFilters} 
      availableBrands={[...new Set(allItems.map(item => item.brand))]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8">
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
    </div>
  );
}
