"use client"
import { useAllPostsStore } from "@/lib/stores/allPosts.store"
import React from "react"

const SearchPage = () => {
  const {allPosts} = useAllPostsStore()
  console.log(allPosts)
  return <div>SearchPage</div>
}

export default SearchPage
