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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
      >
        <div className="absolute top-2 right-2">
          <Button
            aria-label="Close"
            onClick={onClose}
            variant="ghost"
            size="sm"
          >
            ✕
          </Button>
        </div>

        <img src={data.imageUrl} alt={data.title} className="mb-4 rounded" />
        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
        <p className="text-gray-600">{data.brand}</p>
      </div>
    </div>
  );
}
