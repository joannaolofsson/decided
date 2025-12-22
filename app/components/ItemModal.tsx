'use client';
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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 shadow-lg w-full max-w-sm max-h-[90vh] relative flex flex-col"
      >
        <div className="absolute top-2 right-2">
          <Button aria-label="Close" onClick={onClose} variant="ghost" size="sm">
            ✕
          </Button>
        </div>

        {/* Image container */}
        <div className="w-full aspect-square max-h-[50vh] overflow-hidden mb-4">
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-full object-contain rounded"
          />
        </div>

        <h2 className="text-xl font-semibold">{data.title}</h2>
        <p className="text-gray-600">{data.brand}</p>
      </div>
    </div>
  );
}
