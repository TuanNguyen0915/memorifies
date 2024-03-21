"use client"
import * as React from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Bookmark, Heart } from "lucide-react"

export function PostCard({ post }) {
  const postCreator = post.creator
  return (
    <Card className="group w-full">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle>
          <div className="flex items-center gap-4">
            <Image
              src={postCreator.profilePhoto}
              alt="avatar"
              width={80}
              height={80}
              className="h-[60px] w-[60px] rounded-full lg:h-[80px] lg:w-[80px]"
            />
            <div className="flexCol gap-2">
              <p className="max-lg:text-xl">
                {postCreator.firstName} {postCreator.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                @{postCreator.username}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <p className="text-2xl font-bold tracking-wide">{post.caption}</p>
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl lg:h-[600px]">
          <Image
            src={post.postPhoto}
            alt="post"
            fill
            className="rounded-xl object-contain transition-all duration-500 group-hover:scale-110"
          />
        </div>
      </CardContent>
      <CardFooter className="flexBetween">
        <Heart size={30} />
        <Bookmark size={30} />
      </CardFooter>
    </Card>
  )
}
