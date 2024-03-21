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

export function PostCard({ imgSrc }) {
  return (
    <Card className="group w-full">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle>
          <div className="flex items-center gap-4">
            <Image
              src="/assets/avatar.jpeg"
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flexCol gap-2">
              <p>John Doe</p>
              <p className="text-sm text-muted-foreground">@username</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <p className="text-2xl font-bold tracking-wide">Post content</p>
        <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
          <Image
            src={imgSrc}
            alt="post"
            fill
            className="rounded-xl object-contain transition-all duration-500 group-hover:scale-110"
          />
        </div>
      </CardContent>
      <CardFooter className="flexBetween">
        <Heart size={30}/>
        <Bookmark size={30}/>
      </CardFooter>
    </Card>
  )
}
