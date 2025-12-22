"use client";
import { useState } from "react";
import Button from "../components/ui/Button";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function AddItem() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [owned, setOwned] = useState(false);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const supabase = createClient();

  const handleSubmit = async () => {
    // 1. Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to add items");
      return;
    }

    let imageUrl = null;

    // 2. Upload image if a file was selected
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `wardrobe/${fileName}`; // folder inside bucket

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        return;
      }

      // 3. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // 4. Insert item into database
    const { data, error } = await supabase
      .from("itemsList")
      .insert({
        title,
        brand,
        owned,
        size,
        price: Number(price),
        imageUrl,
        user_id: user.id,
      })
      .select();

    if (error) {
      alert("Insert failed: " + error.message);
      return;
    }

    window.location.href = "/dashboard";
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <Link href="/dashboard">Back to Dashboard</Link>
      <h2 className="text-3xl font-serif">Add item to list</h2>

      <div className="flex flex-col p-4 gap-4 w-1/3">
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="border p-2"
        />
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-48 h-48 object-contain rounded border bg-white self-center"
          />
        )}

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

        <label className="font-medium">Owned?</label>

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="owned"
              value="true"
              checked={owned === true}
              onChange={() => setOwned(true)}
            />
            Owned
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="owned"
              value="false"
              checked={owned === false}
              onChange={() => setOwned(false)}
            />
            Not owned
          </label>
        </div>


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
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
          <Button variant="glass" onClick={() => window.location.reload()}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
