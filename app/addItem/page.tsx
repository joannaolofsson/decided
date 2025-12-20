"use client";
import { useState } from "react";
import Button from "../components/ui/Button";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [owned, setOwned] = useState(false);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const supabase = createClient();

  const handleSubmit = async () => {
    await supabase.from("items").insert({
      title,
      brand,
      status: owned,
      size,
      price: Number(price),
      imageUrl: "", // TEMPORARY — add upload later
    });

    // redirect back to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <Link href="/dashboard">Back to Dashboard</Link>
      <h2 className="text-2xl">Add item to list</h2>

      <div className="flex flex-col bg-slate-200 p-4 gap-4 w-1/3">
        <label>Title</label>
        <input
          className="border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Brand</label>
        <input
          className="border p-2"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <label>Owned?</label>
        <input
          type="checkbox"
          checked={owned}
          onChange={(e) => setOwned(e.target.checked)}
        />

        <label>Size</label>
        <input
          className="border p-2"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          className="border p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="flex gap-4">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button variant="ghost" onClick={() => window.location.reload()}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
