"use client"
import { getUserByClerkId } from "@/lib/services/user.service"
import { useUserStore } from "@/lib/stores/user.store"
import { useUser } from "@clerk/nextjs"
import React, { useEffect } from "react"

const CurrentUser = () => {

  const { user } = useUser()
  const { setCurrentUser } = useUserStore()

  useEffect(() => {
    if (user?.id) {
      try {
        const fetchUser = async () => {
          const data = await getUserByClerkId(user.id)
          setCurrentUser(data)
        }
        fetchUser()
      } catch (error) {
        console.log(error)
      }
    }
    return
  }, [user?.id, setCurrentUser])
  return <></>
}

export default CurrentUser
