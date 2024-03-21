"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/lib/stores/user.store"
import { EyeIcon, Pencil } from "lucide-react"
import React, { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import PreviewPostForm from "./PreviewPostForm"

const PostForm = () => {
  const { currentUser } = useUserStore()
  const [isTransition, setIsTransition] = useTransition()
  const [isPreview, setIsPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      caption: "",
      postPhoto: "",
      tag: "",
      author: "",
    },
  })

  const handleChangePhoto = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    setPreviewUrl(url)
  }

  const publishPost = async (data) => {
    setIsTransition(() => {
      data.author = currentUser?._id
      console.log(data)
    })
  }
  return (
    <form onSubmit={handleSubmit(publishPost)} className="space-y-4">
      <div
        className={`${
          isPreview ? "hidden" : "flexCenter"
        }  h-[400px] w-full rounded-xl border border-input`}
      >
        <Input
          type="file"
          onChange={handleChangePhoto}
          className="border-none"
        />
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
          previewUrl={previewUrl}
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
        <Button type="submit" variant="custom" className="min-w-[150px]">
          {isTransition ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
