'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const Sidebar = () => {
    const pathname = usePathname()
  return (
    <section className='sticky left-0 top-0 flex flex-col h-screen w-fit justify-between bg-muted-foreground p-6 pt-28 text-white max-sm:hidden lg:w-[260px]'>
        <div className='flex flex-1 flex-col gap-6'>
            {sidebarLinks.map((nav) => {
                const isActive = pathname === nav.route || pathname.startsWith(`${nav.route}/`)
                return(
                    <Link href={nav.route} key={nav.title} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start hover:opacity-75', isActive ? 'bg-white text-black' : 'bg-transparent')}>
                        <Image
                        src={nav.imgUrl}
                        alt={nav.title}
                        width={24}
                        height={24}
                        />
                        <p className='text-lg font-semibold max-lg:hidden'>{nav.title}</p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}
