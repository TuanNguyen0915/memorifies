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

export function PostCard({ post }) {
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
    await likePost(currentUser._id, post._id)
    const updatedPosts = await getAllPosts()
    updatedCurrentUser()
    setAllPosts(updatedPosts)
  }
  const handleSave = async () => {
    await savePost(currentUser?._id, post._id)
    updatedCurrentUser()
  }

  const handleFollow = async () => {
    await followingUser(currentUser?.clerkId, post?.creator._id)
    updatedCurrentUser()
  }
  return (
    <Card className="group w-full">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle>
          <div className="flex w-full justify-between">
            {/* AUTHOR INFO */}
            <div className="flex items-center gap-4">
              <Image
                src={post.creator.profilePhoto}
                alt="avatar"
                width={80}
                height={80}
                className="h-[60px] w-[60px] rounded-full lg:h-[80px] lg:w-[80px]"
              />
              <div className="flexCol gap-2">
                <p className="max-lg:text-xl">
                  {post.creator.firstName} {post.creator.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
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
          <Image
            src={post.postPhoto}
            alt="post"
            fill
            className="rounded-xl object-contain transition-all duration-500 group-hover:scale-110"
          />
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
