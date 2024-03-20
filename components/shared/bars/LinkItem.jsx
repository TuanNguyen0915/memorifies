'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LinkItem = ({ path, name, icon: Icon }) => {
  const pathName = usePathname()
  const isActive = pathName === path
  return (
    <Link href={path} className='group'>
      <div className={` flex w-full items-center gap-4 rounded-xl p-4 ${isActive && 'bg-primary px-10'}`}>
        <Icon size={26} />
        <p className={`tracking-wide ${isActive ? 'text-xl font-bold' : 'text-lg font-normal'}`}>{name}</p>
      </div>
      <div className={`h-[2px] w-0 bg-primary transition-all duration-300 ${!isActive && 'group-hover:w-full'} `} />
    </Link>
  )
}

export default LinkItem
