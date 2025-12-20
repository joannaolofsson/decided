"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "../components/ui/Card";
import { items } from "@/lib/styleOptions";
import ItemModal from "../components/ItemModal";
import Button from "../components/ui/Button";
import Link from "next/link";

export default function Wardrobe() {
  const router = useRouter();
  const sp = useSearchParams();
  const openId = sp.get("item");

  const handleCardClick = (id: string) => {
    router.push(`/wardrobe?item=${id}`);
  };

  const handleCloseModal = () => {
    router.push("/wardrobe");
  };


  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-4xl self-center">My decided Wardrobe</h1>
      <div className="flex flex-row justify-between">

       <Link href="/addItem">Add +</Link>

        <Button
        variant="ghost">
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(items).map(([id, item]) => (
          <Card
            key={id}
            imageUrl={item.imageUrl}
            title={item.title}
            brand={item.brand}
            onClick={() => handleCardClick(id)}
          />
        ))}
      </div>

      {openId && (
        <ItemModal
          id={openId}
          data={items[openId]}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
