"use client"
import { PostCard } from "@/components/shared/mainContainer/PostCard"
import { getAllPosts } from "@/lib/services/post.service"
import { useEffect, useState, useTransition } from "react"

const HomePage = () => {
  const [allPosts, setAllPosts] = useState([])
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const data = await getAllPosts()
        setAllPosts(data)
      }
      fetchPosts()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  return (
    <main className="flexCol gap-10">
      {allPosts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  )
}

export default HomePage
