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

  const handleFollow = async () => {
    if (currentUser) {
      await followingUser(currentUser?.clerkId, user._id)
      const updatedUser = await getUserByClerkId(currentUser?.clerkId)
      setCurrentUser(updatedUser)
    } else {
      return
    }
  }

  return (
    <div
      className="flexBetween w-full"
      
    >
      <div className="flex items-center gap-4 cursor-pointer"
      onClick={()=> router.push(`/profile/${user.clerkId}`)}>
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
            className="text-red-400 opacity-80 hover:opacity-100 lg:size-10 cursor-pointer"
          />
        ) : (
          <UserRoundPlus
            onClick={handleFollow}
            className="text-indigo-500 opacity-80 hover:opacity-100 lg:size-10 cursor-pointer"
          />
        ))}
    </div>
  )
}

export default FollowCard
