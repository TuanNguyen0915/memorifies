"use client"

import { PostCard } from "@/components/shared/mainContainer/PostCard"
import { useUserStore } from "@/lib/stores/user.store"

const SavePage = () => {
  const { currentUser } = useUserStore()
  const savePosts = currentUser?.savePosts
  return (
    <main className="flexCol gap-10">
      {savePosts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  )
}

export default SavePage
