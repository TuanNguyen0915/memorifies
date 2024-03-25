"use client"
import EmptyPosts from "@/components/shared/EmptyPosts"
import PostLoader from "@/components/shared/PostLoader"
import TagItem from "@/components/shared/mainContainer/TagItem"
import { PostCard } from "@/components/shared/postCard/PostCard"
import { tags } from "@/lib/constants"
import { useAllPostsStore } from "@/lib/stores/allPosts.store"
import { CloudFog } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState, useTransition } from "react"

const HomePage = () => {
  const params = useSearchParams()
  const [isTransition, startTransition] = useTransition()
  const { allPosts } = useAllPostsStore()
  const [filterPosts, setFilterPosts] = useState(allPosts || [])
  const getCategory = useCallback(
    (category) => {
      startTransition(async () => {
        try {
          if (!category || category === "All") {
            setFilterPosts(allPosts)
          } else {
            const filterData = allPosts.filter((post) => post.tag === category)
            setFilterPosts(filterData)
          }
        } catch (error) {
          console.log(error)
        }
      })
    },
    [allPosts],
  )
  if (isTransition) {
    return (
      <>
        <PostLoader />
        <PostLoader />
      </>
    )
  }
  return (
    <main className="flexCol gap-10">
      <div className="grid w-full grid-cols-4 gap-2 lg:grid-cols-6 lg:gap-4">
        {tags.map((tag) => (
          <TagItem key={tag.name} tag={tag} getCategory={getCategory} />
        ))}
      </div>
      {filterPosts.length === 0 ? (
        <div className="flexCenter h-[50vh] w-full">
          <EmptyPosts category={params?.get("category")} />
        </div>
      ) : (
        filterPosts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </main>
  )
}

export default HomePage
