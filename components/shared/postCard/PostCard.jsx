"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Bookmark, Heart } from "lucide-react"
import { useUserStore } from "@/lib/stores/user.store"
import { getAllPosts, getPostTagColor } from "@/lib/services/post.service"
import {
  followingUser,
  getUserByClerkId,
  likePost,
  savePost,
} from "@/lib/services/user.service"
import { useRouter } from "next/navigation"
import PostCardHeader from "./PostCardHeader"

export function PostCard({ post, setFilterPosts, category }) {
  const tagColor = getPostTagColor(post?.tag)
  const router = useRouter()
  const { currentUser, setCurrentUser } = useUserStore()
  const isLike = post.likes.includes(currentUser?._id.toString())
  const isSave = currentUser?.savePosts.filter(
    (item) => item._id?.toString() === post._id.toString(),
  )

  const updatedCurrentUser = async () => {
    const updatedUser = await getUserByClerkId(currentUser?.clerkId)
    setCurrentUser(updatedUser)
  }

  const handleLike = async (e) => {
    e.stopPropagation()
    if (currentUser) {
      await likePost(currentUser?._id, post._id)
      const updatedPosts = await getAllPosts()
      let newFilterPosts
      if (category === "All" || !category) {
        newFilterPosts = updatedPosts
      } else {
        newFilterPosts = await updatedPosts.filter(
          (item) => item.tag == category,
        )
      }

      updatedCurrentUser()
      if (setFilterPosts) setFilterPosts(newFilterPosts)
      return
    } else {
      return
    }
  }
  const handleSave = async (e) => {
    e.stopPropagation()
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
    <Card
      className="group w-full"
      onClick={() => router.push(`/post/${post._id}`)}
    >
      <PostCardHeader post={post} handleFollow={handleFollow} />
      <CardContent className="w-full">
        <p className="text-2xl font-bold capitalize tracking-wide">
          {post.caption}
        </p>
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
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/?category=${post.tag}`)
          }}
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
