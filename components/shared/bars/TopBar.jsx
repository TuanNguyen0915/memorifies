"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import Image from "next/image"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import Link from "next/link"
import { useUserStore } from "@/lib/stores/user.store"
import { SignedIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const TopBar = () => {
  const { currentUser } = useUserStore()
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/search/?key=${searchTerm}`)
    setSearchTerm("")
  }

  return (
    <div className="flexBetween w-full gap-2 p-4">
      <form
        className="group relative flex-1"
        onSubmit={handleSubmit}
      >
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-[50px] rounded-2xl border-border px-6 py-2"
          placeholder="Search..."
          autoComplete="off"
        />
        <BsSearch
          size={24}
          className={`absolute right-4 top-3 opacity-65 transition-all group-hover:opacity-100 ${
            searchTerm && "opacity-100"
          }`}
          onClick={() => router.push(`/search/?key=${searchTerm}`)}
        />
      </form>
      <SignedIn>
        {currentUser && (
          <>
            <div className="max-lg:hidden">
              <Link href="/new-post">
                <Button variant="custom">New Post</Button>
              </Link>
            </div>
            <div className="lg:hidden">
              <Link href={`/profile/${currentUser.clerkId}`}>
                <Image
                  src={currentUser.profilePhoto}
                  alt={currentUser.username}
                  width={50}
                  height={50}
                  className="rounded-full ring-2 ring-primary"
                />
              </Link>
            </div>
          </>
        )}
      </SignedIn>
    </div>
  )
}

export default TopBar
