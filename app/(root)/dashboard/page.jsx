"use client"
import { useUserStore } from "@/lib/stores/user.store"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { getUserByClerkId } from "@/lib/services/user.service"
import { deletePost } from "@/lib/services/post.service"
const DashboardPage = () => {
  const router = useRouter()
  const { currentUser, setCurrentUser } = useUserStore()

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserByClerkId(currentUser?.clerkId)
      setCurrentUser(user)
    }
    fetchData()
  }, [currentUser?.clerkId, setCurrentUser])

  const handleDelete = async (postId) => {
    await deletePost(postId)
    //update the currentUser
    const user = await getUserByClerkId(currentUser?.clerkId)
    setCurrentUser(user)
  }

  return (
    <Table className="mt-10">
      {currentUser.posts && (
        <>
          <TableCaption>
            <p className="group">
              Total
              <span className="mx-2 transition-all group-hover:text-foreground">
                {currentUser.firstName} {currentUser.lastName}
              </span>
              posts :
              <span className="mx-2 text-xl font-bold text-foreground">
                {posts?.length}
              </span>
            </p>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post._id} className="group">
                <TableCell className="text-base font-semibold opacity-70 transition-all group-hover:opacity-100 lg:text-lg ">
                  {post.caption}
                </TableCell>
                <TableCell>
                  <div className="relative h-[100px] w-[100px] overflow-hidden rounded-xl lg:h-[150px] lg:w-[150px]">
                    <Image
                      src={post.postPhoto}
                      fill
                      alt={post.caption}
                      className="rounded-xl border object-cover object-center transition-all group-hover:scale-110"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flexCol gap-4">
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-orange-400"
                      onClick={() => router.push(`/post/${post._id}/edit`)}
                    >
                      <PencilIcon className="size-5" />
                      <p className="text-sm font-bold lg:text-lg">Edit</p>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-red-400"
                      onClick={() => handleDelete(post._id)}
                    >
                      <TrashIcon className="size-5" />
                      <p className="text-sm font-bold lg:text-lg">Del</p>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  )
}

export default DashboardPage
