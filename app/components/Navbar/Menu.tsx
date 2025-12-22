import React from 'react';
import Link from 'next/link';

export default function Menu() {
  return (
    <div className='flex flex-row justify-center align-centerz-100'>
      <Link href="/dashboard">Home</Link>
      <Link href="/addItem">Add Item</Link>
    </div>
  )
}
