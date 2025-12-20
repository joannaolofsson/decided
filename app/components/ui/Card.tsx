'use client'
import React from 'react';

export interface CardProps {
  title: string;
  brand: string;
  imageUrl: string;
  onClick?: () => void;
}

export default function Card({ title, brand, imageUrl, onClick }: CardProps) {
  return (
    <div
      className="rounded-lg shadow p-4 cursor-pointer"
      onClick={onClick}
    >
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded" />
      <h4 className="mt-2 font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">{brand}</p>
    </div>
  );
}
