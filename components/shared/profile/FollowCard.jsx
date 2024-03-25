"use client"
import { followingUser, getUserByClerkId } from "@/lib/services/user.service"
import { useUserStore } from "@/lib/stores/user.store"
import { UserRoundMinus, UserRoundPlus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

const FollowCard = ({ user }) => {
  const router = useRouter()
  const { currentUser, setCurrentUser } = useUserStore()
  const isFollowing = currentUser?.followings?.find(
    (item) => item._id === user._id,
  )

  const handleFollow = async (e) => {
    e.stopPropagation()
    if (currentUser) {
      await followingUser(currentUser?.clerkId, user._id)
      const updatedUser = await getUserByClerkId(currentUser?.clerkId)
      setCurrentUser(updatedUser)
    } else {
      return
    }
  }

  return (
    <div className="group w-full cursor-pointer space-y-4"
    onClick={() => router.push(`/profile/${user.clerkId}`)}>
      <div className="flexBetween w-full">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={() => router.push(`/profile/${user.clerkId}`)}
        >
          <Image
            src={user.profilePhoto}
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full object-cover object-center opacity-0 transition-all duration-1000 max-lg:h-[50px] max-lg:w-[50px]"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
          <div className="space-y-2">
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p className="italic text-muted-foreground">@{user.username}</p>
          </div>
        </div>
        {currentUser?._id !== user._id &&
          (isFollowing ? (
            <UserRoundMinus
              onClick={handleFollow}
              className="cursor-pointer text-red-400 opacity-80 hover:opacity-100 md:size-10 lg:size-12"
            />
          ) : (
            <UserRoundPlus
              onClick={handleFollow}
              className="cursor-pointer text-indigo-500 opacity-80 hover:opacity-100 md:size-10 lg:size-12"
            />
          ))}
      </div>
      {/* HOVER LINE */}
      <div className="h-[1px] w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></div>
    </div>
  )
}

export default FollowCard
