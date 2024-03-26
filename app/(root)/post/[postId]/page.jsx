"use client"
import PostLoader from "@/components/shared/PostLoader"

import { getPostById, getPostTagColor } from "@/lib/services/post.service"
import { CheckCheck, CopyIcon, Download, Link2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { saveAs } from "file-saver"
import PostCardHeader from "@/components/shared/postCard/PostCardHeader"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { followingUser, getUserByClerkId } from "@/lib/services/user.service"
import { currentUser } from "@clerk/nextjs"
import { useUserStore } from "@/lib/stores/user.store"

const PostPage = ({ params }) => {
  const router = useRouter()
  const {currentUser, setCurrentUser } = useUserStore()
  const [transition, startTransition] = useTransition()
  const [post, setPost] = useState(null)
  const [isWaitCopy, setIsWaitCopy] = useState(false)
  const [isWaitDownload, setIsWaitDownload] = useState(false)
  const [tagColor, setTagColor] = useState(null)
  const [publishDate, setPublishDate] = useState(null)
  useEffect(() => {
    startTransition(async () => {
      const data = await getPostById(params.postId)
      setPost(data)
      const color = getPostTagColor(data.tag)
      const day = Math.floor(
        (new Date() - new Date(data?.createdAt)) / 86400000,
      )
      setPublishDate(day)
      setTagColor(color)
    }, [params.postId])
  }, [params])
  if (transition) {
    return (
      <div className="w-full">
        <PostLoader />
      </div>
    )
  }

  const handleFollow = async () => {
    if (currentUser) {
      await followingUser(currentUser?.clerkId, post?.creator._id)
      const user = await getUserByClerkId(currentUser?.clerkId)
      setCurrentUser(user)
    } else {
      return
    }
  }

  const handleDownload = () => {
    setIsWaitDownload(true)
    saveAs(post.postPhoto, `memorify_${new Date().getTime()}.jpg`)
    setTimeout(() => {
      setIsWaitDownload(false)
    }, 1500)
  }
  const handleCopy = () => {
    setIsWaitCopy(true)
    navigator.clipboard.writeText(post.postPhoto)
    setTimeout(() => {
      setIsWaitCopy(false)
    }, 1500)
  }

  return (
    <main className="w-full">
      {post && (
        <div className="w-full space-y-4">
          <div className="flex w-full items-center justify-end gap-4">
            <Link href={post.postPhoto} target="_blank">
              <Link2
                size={24}
                className="text-muted-foreground transition-all hover:text-foreground"
              />
            </Link>
            {isWaitCopy ? (
              <CheckCheck
                size={24}
                className="cursor-progress text-indigo-500 brightness-125"
              />
            ) : (
              <CopyIcon
                onClick={handleCopy}
                size={24}
                className="cursor-copy text-muted-foreground transition-all hover:text-foreground"
              />
            )}
            {isWaitDownload ? (
              <Download
                size={24}
                className="cursor-progress text-indigo-500 brightness-150"
              />
            ) : (
              <Download
                onClick={handleDownload}
                size={24}
                className="text-muted-foreground transition-all hover:text-foreground"
              />
            )}
          </div>
          <Image
            download={true}
            src={post.postPhoto}
            alt={post.caption}
            width={2000}
            height={2000}
            className="rounded-xl object-cover opacity-0 shadow-xl transition-all duration-500"
            onLoadingComplete={(image) => {
              image.classList.remove("opacity-0")
            }}
          />
          <div className="flexBetween w-full flex-wrap border-b pb-4">
            <div className="space-y-4">
              <p className="text-3xl font-bold capitalize tracking-wide">
                {post.caption}
              </p>
              <p className="italic text-muted-foreground">
                Publish:
                {publishDate === 0
                  ? " Today"
                  : publishDate === 1
                    ? " Yesterday"
                    : ` ${publishDate} days ago`}
              </p>
            </div>
            <Button
              style={{ backgroundColor: tagColor }}
              onClick={() => {
                router.push(`/?category=${post.tag}`)
              }}
            >
              {post.tag}
            </Button>
          </div>
          <PostCardHeader post={post} handleFollow={handleFollow} />
        </div>
      )}
    </main>
  )
}

export default PostPage
