"use client"

import { PostCard } from "@/components/shared/mainContainer/PostCard"
import { useUserStore } from "@/lib/stores/user.store"

const LikePage = () => {
  const { currentUser } = useUserStore()
  const likePosts = currentUser?.likePosts

  return (
    <main className="flexCol gap-10">
      {likePosts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  )
}

export default LikePage
