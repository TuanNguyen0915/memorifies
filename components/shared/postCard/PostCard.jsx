"use client"
import * as React from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Bookmark, Heart, UserRoundMinus, UserRoundPlus } from "lucide-react"
import { useUserStore } from "@/lib/stores/user.store"
import { getAllPosts } from "@/lib/services/post.service"
import {
  followingUser,
  getUserByClerkId,
  likePost,
  savePost,
} from "@/lib/services/user.service"
import { useAllPostsStore } from "@/lib/stores/allPosts.store"
import { useRouter } from "next/navigation"
import { tags } from "@/lib/constants"

export function PostCard({ post }) {
  const tagColor = tags.find((tag) => tag.name === post.tag)?.color
  const router = useRouter()
  const { setAllPosts } = useAllPostsStore()
  const { currentUser, setCurrentUser } = useUserStore()
  const isLike = post.likes.includes(currentUser?._id.toString())
  const isSave = currentUser?.savePosts.filter(
    (item) => item._id?.toString() === post._id.toString(),
  )
  const isAuthor = currentUser?.posts.filter(
    (item) => item._id?.toString() === post._id.toString(),
  )
  const isFollowed = currentUser?.followings.filter(
    (item) => item._id === post?.creator._id,
  )

  const updatedCurrentUser = async () => {
    const updatedUser = await getUserByClerkId(currentUser?.clerkId)
    setCurrentUser(updatedUser)
  }

  const handleLike = async () => {
    if (currentUser) {
      await likePost(currentUser?._id, post._id)
      const updatedPosts = await getAllPosts()
      updatedCurrentUser()
      setAllPosts(updatedPosts)
    } else {
      return
    }
  }
  const handleSave = async () => {
    if (currentUser) {
      await savePost(currentUser?._id, post._id)
      updatedCurrentUser()
    } else {
      return
    }
  }

  const handleFollow = async () => {
    if (currentUser) {
      await followingUser(currentUser?.clerkId, post?.creator._id)
      updatedCurrentUser()
    } else {
      return
    }
  }
  return (
    <Card className="group w-full">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle>
          <div className="flex w-full justify-between">
            {/* AUTHOR INFO */}
            <div
              className="group/creator flex cursor-pointer items-center gap-4"
              onClick={() => router.push(`/profile/${post.creator.clerkId}`)}
            >
              <Image
                src={post.creator.profilePhoto}
                alt="avatar"
                width={80}
                height={80}
                className="h-[60px] w-[60px] rounded-full opacity-0 transition-all group-hover/creator:ring-[1px] group-hover/creator:ring-primary lg:h-[80px] lg:w-[80px]"
                onLoadingComplete={(image) =>
                  image.classList.remove("opacity-0")
                }
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
                  onClick={handleFollow}
                  className={`size-10 cursor-pointer text-indigo-500 opacity-80 transition-all hover:opacity-100`}
                />
              ) : (
                <UserRoundMinus
                  onClick={handleFollow}
                  className={`size-10 cursor-pointer text-red-400 opacity-80 transition-all hover:opacity-100`}
                />
              ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <p className="text-2xl font-bold tracking-wide">{post.caption}</p>
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl lg:h-[600px]">
          {/* IMAGE */}
          <Image
            src={post.postPhoto}
            alt="post"
            fill
            className="rounded-xl object-contain opacity-0 transition-all duration-1000 group-hover:scale-110"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        </div>
        {/* TAG*/}
        <div
          onClick={() => router.push(`/?category=${post.tag}`)}
          className="my-4 w-fit cursor-pointer rounded-xl border px-4 py-2 transition-all duration-500 hover:opacity-60"
          style={{
            backgroundColor: tagColor,
            borderColor: tagColor,
          }}
        >
          <p className="bg-transparent text-sm text-foreground">{post.tag}</p>
        </div>
      </CardContent>
      <CardFooter className="flexBetween">
        <div className="flex items-center gap-2">
          <Heart
            size={30}
            className={`${isLike && "text-red-400"} cursor-pointer hover:text-red-400`}
            onClick={handleLike}
          />
          <p>{post.likes.length < 1 ? "" : `(${post.likes.length})`}</p>
        </div>
        <Bookmark
          className={`${isSave?.length > 0 && "text-orange-400"} cursor-pointer hover:text-orange-400`}
          size={30}
          onClick={handleSave}
        />
      </CardFooter>
    </Card>
  )
}
