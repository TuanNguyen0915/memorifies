"use client"
import PostLoader from "@/components/shared/PostLoader"
import { PostCard } from "@/components/shared/mainContainer/PostCard"
import { getAllPosts } from "@/lib/services/post.service"
import { useAllPostsStore } from "@/lib/stores/allPosts.store"
import { useEffect, useTransition } from "react"

const HomePage = () => {
  const [isTransition, startTransition] = useTransition()
  const { allPosts, setAllPosts } = useAllPostsStore()
  useEffect(() => {
    startTransition(async () => {
      try {
      const data = await getAllPosts()
        setAllPosts(data)
      } catch (error) {
        console.log(error)
      }
    })
  }, [setAllPosts])

  if (isTransition)
    return (
      <>
        <PostLoader />
        <PostLoader />
      </>
    )
  return (
    <main className="flexCol gap-10">
      {allPosts.length > 0 &&
        allPosts.map((post) => <PostCard key={post._id} post={post} />)}
    </main>
  )
}

export default HomePage
