"use client";
import Button from "./ui/Button";

export type itemsModalProps = {
  id: string;
  data?: { title: string; brand: string; imageUrl: string };
  onClose: () => void;
};

export default function ItemModal({ id, data, onClose }: itemsModalProps) {
  if (!data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} 
      >
        <Button
          aria-label="Close"
          onClick={onClose}
          variant="ghost"
        >
          ✕
        </Button>

        <img src={data.imageUrl} alt={data.title} />
        <h2>
          {data.title}
        </h2>
        <p>{data.brand}</p>

          <Button onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
  );
}
