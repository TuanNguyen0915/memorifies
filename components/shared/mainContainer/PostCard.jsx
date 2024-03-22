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
import { Bookmark, Heart } from "lucide-react"
import { useUserStore } from "@/lib/stores/user.store"
import { getAllPosts, likePost, savePost } from "@/lib/services/post.service"
import { getUserByClerkId } from "@/lib/services/user.service"
import { useAllPostsStore } from "@/lib/stores/allPosts.store"
export function PostCard({ post }) {
  const { setAllPosts } = useAllPostsStore()
  const { currentUser, setCurrentUser } = useUserStore()
  const postCreator = post.creator
  const isLike = post.likes.includes(currentUser?._id)
  const isSave = currentUser?.savePosts.filter(
    (item) => item._id.toString() === post._id.toString(),
  )
  const handleLike = async () => {
    await likePost(currentUser._id, post._id)
    const updatedPosts = await getAllPosts()
    const updatedUser = await getUserByClerkId(currentUser?.clerkId)
    setCurrentUser(updatedUser)
    setAllPosts(updatedPosts)
  }
  const handleSave = async () => {
    await savePost(currentUser?._id, post._id)
    const updatedUser = await getUserByClerkId(currentUser?.clerkId)
    setCurrentUser(updatedUser)
  }
  return (
    <Card className="group w-full">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle>
          <div className="flex items-center gap-4">
            <Image
              src={postCreator.profilePhoto}
              alt="avatar"
              width={80}
              height={80}
              className="h-[60px] w-[60px] rounded-full lg:h-[80px] lg:w-[80px]"
            />
            <div className="flexCol gap-2">
              <p className="max-lg:text-xl">
                {postCreator.firstName} {postCreator.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                @{postCreator.username}
              </p>
            </div>
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
