"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const EmptyPosts = ({ category }) => {
  const router = useRouter()
  return (
    <div className="flexCenter w-full flex-col gap-10  rounded-xl border p-4 shadow-lg">
      <p className="lg:text-xl">
        No posts found with category:{" "}
        <span className="text-lg font-bold text-primary lg:text-xl">
          {category}
        </span>
      </p>
      <Button
        variant="custom"
        onClick={() => router.push("/")}
        className="w-full text-lg lg:w-1/2"
      >
        Reset Filter
      </Button>
    </div>
  )
}

export default EmptyPosts
