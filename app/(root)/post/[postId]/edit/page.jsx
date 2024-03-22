"use client"
import PostLoader from "@/components/shared/PostLoader"
import PostForm from "@/components/shared/form/PostForm"
import { getPostById } from "@/lib/services/post.service"
import React, { useEffect, useState, useTransition } from "react"

const EditPage = ({ params }) => {
  const [post, setPost] = useState(null)
  const [isTransition, setIsTransition] = useTransition()

  useEffect(() => {
    setIsTransition(async () => {
      const post = await getPostById(params.postId)
      setPost(post)
    })
  }, [params.postId])

  if (isTransition) {
    return (
      <div className="w-full">
        <PostLoader />
      </div>
    )
  }
  return <PostForm post={post} editing />
}

export default EditPage
