"use client"
import { SignOutButton } from '@clerk/clerk-react'
import { LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProfileHeader = ({myProfile}) => {
  return (
    <div className="group relative h-[250px] w-full overflow-hidden rounded-xl lg:h-[400px] border">
            <Image
              src="https://source.unsplash.com/random/900x500/?night"
              alt="image"
              fill
              className="rounded-xl object-cover object-center opacity-0 transition-all duration-1000 group-hover:scale-110"
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-xl transition-all duration-1000 group-hover:bg-black/40"></div>
            {myProfile && (
              <div
              onClick={()=> setCurrentUser(null)}
              className="flexCenter absolute right-4 top-4 z-20 rounded-xl bg-red-400 px-4 py-2 opacity-50 transition-all duration-1000 group-hover:opacity-100">
                <SignOutButton>
                  <div className="flexCenter gap-1 cursor-pointer">
                    <LogOutIcon className="size-4 max-lg:hidden" />
                    <p className="text-xs">Sign Out</p>
                  </div>
                </SignOutButton>
              </div>
            )}
          </div>
  )
}

export default ProfileHeader