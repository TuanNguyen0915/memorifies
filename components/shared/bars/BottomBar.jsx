'use client'

import { navLinks } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const BottomBar = () => {
  const pathName = usePathname()

  return (
    <div className='flex items-center justify-around sticky bottom-0 left-0 right-0 z-20 min-h-[100px] w-full bg-black px-6 lg:hidden'>
      {navLinks.map((link, idx) => {
        const isActive = pathName === link.path
        return (
          <Link
            href={link.path}
            key={idx}
            className={` ${
              isActive && 'bg-secondary-100'
            } flex items-center gap-4 rounded-xl p-4 text-2xl duration-300 hover:bg-primary`}>
            <p className='scale-125 flexCenter'>{link.icon}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default BottomBar
