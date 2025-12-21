import React from 'react';
import Link from 'next/link';

export default function Menu() {
  return (
    <div>
      <Link href="/dashboard">Home</Link>
      <Link href="/addItem">Add Item</Link>
    </div>
  )
}
