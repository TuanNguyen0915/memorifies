import React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Bookmark, Heart } from "lucide-react"
const PreviewPostForm = ({currentUser, previewUrl, watch}) => {
  return (
    <Card className="group w-full">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle>
          <div className="flex items-center gap-4">
            <Image
              src={currentUser.profilePhoto}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flexCol gap-2">
              <p>
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                @{currentUser.username}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {watch("caption") ? (
          <p className="text-2xl font-bold tracking-wide">{watch("caption")}</p>
        ) : (
          <p className="text-2xl font-bold tracking-wide text-red-300">
            Missing caption
          </p>
        )}
        <div className="flexCenter relative h-[600px] w-full overflow-hidden rounded-xl">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="post"
              fill
              className="rounded-xl object-contain transition-all duration-500 group-hover:scale-110"
            />
          ) : (
            <p className="text-2xl font-bold tracking-wide text-red-300">
              Missing photo
            </p>
          )}
        </div>
        {watch("tag") ? (
          <p className="text-2xl font-bold tracking-wide">{watch("tag")}</p>
        ) : (
          <p className="text-lg font-bold tracking-wide text-red-300">
            Missing tag
          </p>
        )}
      </CardContent>
      <CardFooter className="flexBetween">
        <Heart size={30} />
        <Bookmark size={30} />
      </CardFooter>
    </Card>
  )
}

export default PreviewPostForm
