import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MobileNav } from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <nav className=' flex justify-between fixed z-50 w-full bg-muted-foreground px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
      <Image
      src='/icons/bnt.png'
      alt='logo'
      width={100}
      height={50}
      className=' object-contain'
      />
      </Link>

      <div className='flex justify-between gap-5'>
        <SignedIn>
              <UserButton />
        </SignedIn>
        <MobileNav/>
      </div>
    </nav>
  )
}
