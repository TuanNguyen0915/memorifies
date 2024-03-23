"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/lib/stores/user.store"
import { EyeIcon, Pencil } from "lucide-react"
import React, { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import PreviewPostForm from "./PreviewPostForm"
import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import Image from "next/image"
import { createPost, updatedPost } from "@/lib/services/post.service"
import { useRouter } from "next/navigation"
import { getUserByClerkId } from "@/lib/services/user.service"
const PostForm = ({ post, editing }) => {
  const router = useRouter()
  const { currentUser, setCurrentUser } = useUserStore()
  const [isTransition, setIsTransition] = useTransition()
  const [isPreview, setIsPreview] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      caption: post?.caption || "",
      postPhoto: post?.postPhoto || "",
      tag: post?.tag || "",
      creator: post?.creator || "",
    },
  })

  const publishPost = (data) => {
    setIsTransition(async () => {
      if (editing) {
        const selectedPost = await updatedPost(data, post?._id)
        if (selectedPost.status === 201) {
          const updatedUser = await getUserByClerkId(currentUser?.clerkId)
          setCurrentUser(updatedUser)
          return router.push("/")
        }
      } else {
        data.creator = currentUser?._id
        const newPost = await createPost(data)

        if (newPost.status === 201) {
          const updatedUser = await getUserByClerkId(currentUser?.clerkId)
          setCurrentUser(updatedUser)
          return router.push("/")
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(publishPost)} className="space-y-4">
      <div
        className={`${
          isPreview ? "hidden" : "flexCenter flexCol"
        }  h-[400px] w-full rounded-xl border border-input`}
      >
        <label htmlFor="postPhoto" className="flex items-center gap-10">
          <MdOutlineAddPhotoAlternate size={60} />

          <p>
            {watch("postPhoto")?.length > 0
              ? "Select another file"
              : "Select a file"}
          </p>
        </label>
        <Input
          {...register("postPhoto")}
          type="file"
          className="w-full border-none"
          id="postPhoto"
          style={{ display: "none" }}
          accept="image/*"
        />
        {typeof watch("postPhoto") === "string" &&
        watch("postPhoto").length > 0 ? (
          <Image
            src={watch("postPhoto")}
            alt="post"
            width={200}
            height={150}
            className="rounded-xl object-contain"
          />
        ) : (
          watch("postPhoto") && (
            <Image
              src={URL.createObjectURL(watch("postPhoto")[0])}
              alt="post"
              width={200}
              height={150}
              className="rounded-xl object-contain"
            />
          )
        )}
      </div>
      <Input
        {...register("caption", {
          required: "Please field all the fields",
          validate: (value) => {
            if (value.length < 3) {
              return "Caption must be at least 3 characters"
            }
            return true
          },
        })}
        placeholder="Caption"
        className={`${isPreview ? "hidden" : "block"}`}
      />
      {errors.caption && (
        <p className="text-sm text-red-500">{errors.caption.message}</p>
      )}
      <Input
        {...register("tag", {
          required: "Please field all the fields",
          validate: (value) => {
            if (value.length < 3) {
              return "Tag must be at least 3 characters"
            }
            return true
          },
        })}
        placeholder="Tag"
        className={`${isPreview ? "hidden" : "block"}`}
      />
      {errors.tag && (
        <p className="text-sm text-red-500">{errors.tag.message}</p>
      )}

      {isPreview && currentUser && (
        <PreviewPostForm
          currentUser={currentUser}
          previewUrl={
            typeof watch("postPhoto") === "string"
              ? watch("postPhoto")
              : URL.createObjectURL(watch("postPhoto")[0])
          }
          watch={watch}
        />
      )}

      <div className="flexBetween">
        <div
          className="flexCenter min-w-[150px] cursor-pointer gap-2 rounded-xl bg-primary/70 px-4 py-2 hover:bg-primary"
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? (
            <>
              <Pencil />
              <p>Edit</p>
            </>
          ) : (
            <>
              <EyeIcon />
              <p>Preview</p>
            </>
          )}
        </div>
        <Button
          disabled={isTransition}
          type="submit"
          variant="custom"
          className="min-w-[150px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isTransition ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
