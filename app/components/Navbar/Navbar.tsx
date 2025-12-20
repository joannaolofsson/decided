'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className="flex items-center justify-between h-16 px-4 border-b">
     
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
      <div className="flex-1 flex justify-center text-xl font-bold">
        <Link href="/dashboard" className="block">
          Decided
        </Link>
      </div>
    </div>
  );
}
