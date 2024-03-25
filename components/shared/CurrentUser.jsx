"use client"
import { getAllPosts } from "@/lib/services/post.service"
import { getUserByClerkId } from "@/lib/services/user.service"
import { useAllPostsStore } from "@/lib/stores/allPosts.store"
import { useUserStore } from "@/lib/stores/user.store"
import { useUser } from "@clerk/nextjs"
import React, { useEffect } from "react"

const CurrentUser = () => {
  const { user } = useUser()
  const { setCurrentUser } = useUserStore()
  const {setAllPosts } = useAllPostsStore()
  useEffect(() => {
    try {
      const fetchUser = async () => {
        if (user?.id) {
          const data = await getUserByClerkId(user.id)
          setCurrentUser(data)
        } else return
      }
      fetchUser()
    } catch (error) {
      console.log(error)
    }
  }, [user?.id, setCurrentUser, setAllPosts])

  return <></>
}

export default CurrentUser
