"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "../components/ui/Card";
import ItemModal from "../components/ItemModal";
import Button from "../components/ui/Button";
import Link from "next/link";
import { ClothingItem } from "../types/clothingItem";

export default function DashboardClient() {
  const [items, setItems] = useState<ClothingItem[]>([]);
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
      console.log("Status:", res.status)
      const text = await res.text()
      console.log("Raw response:", text)
      return JSON.parse(text)
    })
    .then(data => {
      setItems(data)
    })
    .catch(err => console.error("JSON error:", err))
}, [])



  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-4xl self-center">My decided Wardrobe</h1>

      <div className="flex flex-row justify-between">
        <Link href="/addItem">Add +</Link>
        <Button variant="ghost">Filter</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
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
          data={items.find((i) => i.id === Number(openId))}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
