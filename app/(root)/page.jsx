"use client"
import PostLoader from "@/components/shared/PostLoader"
import { PostCard } from "@/components/shared/mainContainer/PostCard"
import { getAllPosts } from "@/lib/services/post.service"
import { useAllPostsStore } from "@/lib/stores/allPosts.store"
import { useEffect, useState } from "react"

const HomePage = () => {
  const [isLoading, setIsLoading] = useState()
  const { allPosts, setAllPosts } = useAllPostsStore()
  useEffect(() => {
    setIsLoading(true)
    try {
      const fetchPosts = async () => {
        const data = await getAllPosts()
        setAllPosts(data)
      }
      fetchPosts()
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [setAllPosts])

  if (isLoading) return <PostLoader />
  return (
    <main className="flexCol gap-10">
      {allPosts.length > 0 &&
        allPosts.map((post) => <PostCard key={post._id} post={post} />)}
    </main>
  )
}

export default HomePage
