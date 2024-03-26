"use client"
import PostLoader from "@/components/shared/PostLoader"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState, useTransition } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { getAllPosts } from "@/lib/services/post.service"
import { getAllUsers } from "@/lib/services/user.service"
import FollowCard from "@/components/shared/profile/FollowCard"

const SearchPage = () => {
  const [isTransition, startTransition] = useTransition()
  const [searchPeople, setSearchPeople] = useState([])
  const [searchPosts, setSearchPosts] = useState([])
  const params = useSearchParams()
  const router = useRouter()
  if (!params?.get("key")) {
    router.push("/")
  }
  useEffect(() => {
    startTransition(async () => {
      //posts
      const postsData = await getAllPosts()
      const postsDataFilter = postsData.filter((post) => {
        if (
          post.caption
            .toLowerCase()
            .includes(params.get("key").toLowerCase()) ||
          post.tag.toLowerCase().includes(params.get("key").toLowerCase())
        ) {
          return post
        }
      })
      setSearchPosts(postsDataFilter)
      //people
      const peopleData = await getAllUsers()
      const peopleDataFilter = peopleData.filter((user) => {
        if (
          user.firstName
            .toLowerCase()
            .includes(params.get("key").toLowerCase()) ||
          user.lastName
            .toLowerCase()
            .includes(params.get("key").toLowerCase()) ||
          user.username.toLowerCase().includes(params.get("key").toLowerCase())
        ) {
          return user
        }
      })
      setSearchPeople(peopleDataFilter)
    })
  }, [params])
  if (isTransition) {
    return (
      <div>
        <PostLoader />
        <PostLoader />
      </div>
    )
  }
  return (
    <main className="flexCol gap-10">
      <p className="text-2xl group">
        The results for{" "}
        <span className="duration-300x text-3xl font-bold text-indigo-500 transition-all group-hover:brightness-125">
          {params.get("key")}
        </span>
      </p>
      <Accordion type="single" collapsible>
        <AccordionItem value="posts">
          <AccordionTrigger className="w-full text-2xl font-bold tracking-wide">
            Posts ({searchPosts.length})
          </AccordionTrigger>
          <AccordionContent>
            {searchPosts.length === 0 ? (
              <p className="text-center text-2xl">No posts found</p>
            ) : (
              <div className="m-2 flex flex-wrap justify-evenly gap-4">
                {searchPosts?.map((post) => (
                  <div
                    key={post._id}
                    className="group relative flex h-[250px] w-1/3 flex-col justify-between gap-4 rounded-xl p-2 ring-1 lg:h-[400px] lg:w-1/4"
                  >
                    <p className="text-xl font-semibold tracking-wide transition-all duration-1000 ">
                      {post.caption}
                    </p>
                    <div className="relative h-[200px] w-full flex-1 overflow-hidden transition-all duration-1000  lg:h-[300px]">
                      <Image
                        src={post.postPhoto}
                        alt={post.caption}
                        fill
                        className="rounded-xl object-contain opacity-0 transition-all duration-1000"
                        onLoadingComplete={(image) => {
                          image.classList.remove("opacity-0")
                        }}
                      />
                    </div>
                    <p className="text-end italic text-muted-foreground transition-all duration-1000">
                      {new Date(post.createdAt).toLocaleDateString("en-US")}
                    </p>
                    {/* BACK CARD */}
                    <div className="backCard flex flex-col items-center justify-evenly gap-5 p-4">
                      <Image
                        src={post.creator.profilePhoto}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="h-[100px] w-[100px] rounded-full object-cover "
                      />
                      <div className="w-full space-y-2 text-center">
                        <p className="text-lg font-bold">
                          {post.creator.firstName} {post.creator.lastName}
                        </p>
                        <p className="italic text-muted-foreground">
                          @{post.creator.username}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="people">
          <AccordionTrigger className="w-full text-2xl font-bold tracking-wide">
            People ({searchPeople.length})
          </AccordionTrigger>
          <AccordionContent>
            {searchPeople.length === 0 ? (
              <p className="text-center text-2xl">No one found</p>
            ) : (
              <div className="w-full space-x-2">
                {searchPeople?.map((user) => (
                  <div key={user._id} className="w-full px-4 py-2">
                    <FollowCard user={user} />
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  )
}

export default SearchPage
