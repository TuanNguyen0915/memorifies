"use client"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/stores/user.store"
import { UserRoundMinus, UserRoundPlus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

const PostCardHeader = ({ post, handleFollow }) => {
  const {currentUser} = useUserStore()
  const router = useRouter()
  const handleClick = (e) => {
    e.stopPropagation()
    if (handleFollow) {
      handleFollow()
    }
  }
  const isAuthor = currentUser?.posts.filter(
    (item) => item._id?.toString() === post._id.toString(),
  )
  const isFollowed = currentUser?.followings.filter(
    (item) => item._id === post?.creator._id,
  )

  return (
    <CardHeader className="flex flex-col gap-4">
      <CardTitle>
        <div className="flex w-full justify-between">
          {/* AUTHOR INFO */}
          <div
            className="group/creator flex cursor-pointer items-center gap-4"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/profile/${post.creator.clerkId}`)
            }}
          >
            <Image
              src={post.creator?.profilePhoto}
              alt="avatar"
              width={80}
              height={80}
              className="h-[60px] w-[60px] rounded-full opacity-0 transition-all group-hover/creator:ring-[1px] group-hover/creator:ring-primary lg:h-[80px] lg:w-[80px]"
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
            <div className="flexCol gap-2">
              <p className="transition-all group-hover/creator:text-primary max-lg:text-xl">
                {post.creator.firstName} {post.creator.lastName}
              </p>
              <p className="text-sm text-muted-foreground transition-all group-hover/creator:text-foreground">
                @{post.creator.username}
              </p>
            </div>
          </div>
          {/* FOLLOW AND UNFOLLOW */}
          {isAuthor?.length === 0 &&
            (isFollowed?.length === 0 ? (
              <UserRoundPlus
                onClick={handleClick}
                className={`size-10 cursor-pointer text-indigo-500 opacity-80 transition-all hover:opacity-100`}
              />
            ) : (
              <UserRoundMinus
                onClick={handleClick}
                className={`size-10 cursor-pointer text-red-400 opacity-80 transition-all hover:opacity-100`}
              />
            ))}
        </div>
      </CardTitle>
    </CardHeader>
  )
}

export default PostCardHeader
