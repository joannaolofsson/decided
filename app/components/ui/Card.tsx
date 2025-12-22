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
    <div className="shadow cursor-pointer bg-white pt-8" onClick={onClick}>
      <div className="relative w-full aspect-square overflow-hidden bg-white">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <div className='bg-background pt-2 pb-4'>
      <h4 className="mt-4 px-4 text-sm font-medium hover:underline">{title}</h4>
      <p className="px-4 text-sm text-foreground">{brand}</p>
      </div>
    </div>
  );
}
