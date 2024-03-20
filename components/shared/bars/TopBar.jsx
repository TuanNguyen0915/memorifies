'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Image from 'next/image'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Link from 'next/link'

const TopBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className='flexBetween w-full gap-2'>
      <div className='group relative flex-1'>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='h-[50px] rounded-2xl border-border px-6 py-2'
          placeholder='Search...'
          autoComplete='off'
        />
        <BsSearch
          size={24}
          className={`absolute right-4 top-3 opacity-65 transition-all group-hover:opacity-100 ${
            searchTerm && 'opacity-100'
          }`}
        />
      </div>
      <div className='max-lg:hidden'>
        <Button variant={'custom'}>New Post</Button>
      </div>
      <div className='lg:hidden'>
        {/* <Link href={`/profile/${currentUser._id}`}>
          <Image
            src={currentUser.profilePhoto}
            alt={currentUser.username}
            width={50}
            height={50}
            className="rounded-full ring-2 ring-primary"
          />
        </Link> */}
      </div>
    </div>
  )
}

export default TopBar