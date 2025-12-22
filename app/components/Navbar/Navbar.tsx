'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from '../../../hooks/useSession';
import { createClient } from '../../../lib/supabase/client';
import Button from '../ui/Button';
import Menu from './Menu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession();
  const supabase = createClient();
  const logout = async () => { await supabase.auth.signOut(); };
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <nav className="relative">
      {/* Navbar row */}
      <div className="flex items-center justify-between h-16 px-4 md:px-8 bg-white z-[999]relative">
        <ul className='flex flex-row gap-6 hidden md:flex'>
          <li><Link href="/dashboard" className='font-medium'>Home</Link></li>
          <li><Link href="/addItem" className='font-medium'>Add item</Link></li>
        </ul>

        {/* Hamburger on the left */}
        <button
          onClick={handleClick}
          className="flex flex-col justify-center items-center h-12 w-12 md:hidden"
        >
          <span
            className={`bg-slate-950 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
          />
          <span
            className={`bg-slate-950 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`bg-slate-950 block transition-all duration-300 ease-out 
              h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}
          />
        </button>

        {/* Center logo */}
        <div className="flex-1 flex justify-center align-center text-xl font-bold pointer-events-none">
          <Link
            href="/dashboard"
            className="block pointer-events-auto uppercase text-2xl md:text-[clamp(2.25rem,3vw,3rem)] font-bold tracking-widest text-foreground pr-12"
          >
            Decided
          </Link>

        </div>
        <div className='hidden md:flex'>
          {session ? (
            <Button variant="ghost" onClick={logout}>Logout</Button>
          ) : (
            <Link href="/start">
              <Button variant="primary">Login</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Slide-out menu */}
      {isOpen && (
        <Menu onClose={() => setIsOpen(false)} />
      )}

    </nav>
  );
}
