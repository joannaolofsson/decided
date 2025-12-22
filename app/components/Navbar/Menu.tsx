import React from 'react';
import Link from 'next/link';
import { useSession } from '../../../hooks/useSession';
import { createClient } from '../../../lib/supabase/client';
import { PiX } from "react-icons/pi";


export default function Menu({ onClose }: { onClose: () => void }) {
  const { session } = useSession();
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full max-w-xs h-screen bg-white/90 backdrop-blur z-[999] flex flex-col gap-6 px-6 pt-12">
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-4 right-4 text-2xl leading-none cursor-pointer"
      >
        <PiX />
      </button>
      <Link href="/dashboard" onClick={onClose} className="font-medium">
        Home
      </Link>

      <Link href="/addItem" onClick={onClose} className="font-medium">
        Add Item
      </Link>

      {session ? (
        <button
          onClick={logout}
          className="font-medium text-left"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/start"
          onClick={onClose}
          className="font-medium"
        >
          Login
        </Link>
      )}
    </div>
  );
}
