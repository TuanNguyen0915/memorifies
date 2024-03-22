"use client"
import { PostCard } from "@/components/shared/mainContainer/PostCard"
import { getAllPosts } from "@/lib/services/post.service"

import { useEffect, useState } from "react"

const HomePage = () => {
  const [allPosts, setAllPosts] = useState([])
  const fetchPosts = async () => {
    const data = await getAllPosts()
    setAllPosts(data)
  }
  useEffect(() => {
    try {
      fetchPosts()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  return (
    <main className="flexCol gap-10">
      {allPosts.map((post) => (
        <PostCard key={post._id} post={post} update={fetchPosts} />
      ))}
    </main>
  )
}

export default HomePage
