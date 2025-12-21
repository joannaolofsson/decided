'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Navbar row */}
      <div className="flex items-center justify-between h-16 px-4 bg-white shadow-md z-10 relative">
        {/* Hamburger on the left */}
        <button
          onClick={handleClick}
          className="flex flex-col justify-center items-center h-12 w-12"
        >
          <span
            className={`bg-neutral-900 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
          />
          <span
            className={`bg-stone-900 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`bg-slate-950 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}
          />
        </button>

        {/* Center logo */}
        <div className="flex-1 flex justify-center text-xl font-bold pointer-events-none">
          <Link href="/dashboard" className="block pointer-events-auto">
            Decided
          </Link>
        </div>
      </div>

      {/* Slide-out menu */}
      {isOpen && (
        <div className="absolute top-0 left-0 h-screen w-[30%] max-w-xs bg-white shadow-lg z-40 p-6 flex flex-col gap-4">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/addItem" onClick={() => setIsOpen(false)}>
            Add Item
          </Link>
        </div>
      )}
    </div>
  );
}
