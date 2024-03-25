"use client"
import EmptyPosts from "@/components/shared/EmptyPosts"
import PostLoader from "@/components/shared/PostLoader"
import TagItem from "@/components/shared/mainContainer/TagItem"
import { PostCard } from "@/components/shared/postCard/PostCard"
import { tags } from "@/lib/constants"
import { getAllPosts } from "@/lib/services/post.service"
import { useAllPostsStore } from "@/lib/stores/allPosts.store"
import { useSearchParams } from "next/navigation"

import { useEffect, useTransition } from "react"

const HomePage = () => {
  const params = useSearchParams()
  const [isTransition, startTransition] = useTransition()
  const { allPosts, setAllPosts } = useAllPostsStore()
  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await getAllPosts()
        setAllPosts(data)
        if (params?.get("category") === "All" || !params?.get("category")) {
          return
        } else {
          const filterData = data.filter(
            (post) => post.tag === params?.get("category"),
          )
          setAllPosts(filterData)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }, [setAllPosts, params])

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
          <TagItem key={tag.name} tag={tag} />
        ))}
      </div>
      {allPosts.length === 0 ? (
        <div className="w-full flexCenter h-[50vh]">
          <EmptyPosts category={params?.get("category")}/>
        </div>
      ) : (
        allPosts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </main>
  )
}

export default HomePage
