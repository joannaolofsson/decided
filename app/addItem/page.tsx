"use client";
import { useState } from "react";
import Button from "../components/ui/Button";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import { PiCaretLeftBold, PiUploadSimpleLight } from "react-icons/pi";

export default function AddItem() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [owned, setOwned] = useState(false);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<any>({});

  const supabase = createClient();

  const handleSubmit = async () => {
    const newErrors: any = {};
    if (!title.trim())
      newErrors.title = "Name is required";
    if (!brand.trim())
      newErrors.brand = "Brand is required";
    if (!size.trim())
      newErrors.size = "Size is required";
    if (!price.trim())
      newErrors.price = "Price is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-2">
      <Link href="/dashboard" className="flex flex-row self-start text-foreground mb-4"><PiCaretLeftBold size="1.1rem" className="mr-2 pt-2" />Back to Dashboard</Link>
      <h2 className="font-serif text-2xl md:text-[clamp(2.25rem,3vw,3rem)] font-normal tracking-normal text-foreground">Add item to list</h2>

      <div className="w-full max-w-md flex flex-col gap-4 text-left">
        <div className="flex flex-row justify-start items-center gap-4 py-4">
          <label className="mt-4">Upload image</label>
          <label htmlFor="file-upload" className="cursor-pointer">
            <PiUploadSimpleLight size="1.5rem" className="text-[#C084FC] mt-1" />
          </label>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </div>

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-48 h-48 object-contain rounded border bg-white self-center"
          />
        )}

        <label>Name item</label>
        <input
          className="border-b border-b-[#cbd1d8] p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <label>Brand</label>
        <input
          className="border-b border-b-[#cbd1d8] p-2"
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
              className="
                appearance-none
                h-4 w-4
                rounded-full
                border border-gray-400
                checked:bg-[#C084FC]
                checked:border-[#C084FC]
                checked:ring-2
                checked:ring-[#C084FC]/40
              "
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
              className="
                appearance-none
                h-4 w-4
                rounded-full
                border border-gray-400
                checked:bg-[#C084FC]
                checked:border-[#C084FC]
                checked:ring-2
                checked:ring-[#C084FC]/40
              "
            />
            Not owned
          </label>
        </div>


        <label className=" pt-4">Size</label>
        <input
          className="border-b border-b-[#cbd1d8] p-2"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          className="border-b border-b-[#cbd1d8] p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="flex gap-4 mt-4 justify-end">
          <Button variant="glass" onClick={() => window.location.reload()}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
