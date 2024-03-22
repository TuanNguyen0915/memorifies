"use client"
import { useUserStore } from "@/lib/stores/user.store"
import React from "react"
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
const DashboardPage = () => {
  const { currentUser } = useUserStore()
  const posts = currentUser?.posts

  return (
    <Table>
      {currentUser && (
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
              <TableHead>Action</TableHead>
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
                      className="rounded-xl object-cover object-center transition-all group-hover:scale-110"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flexCol gap-4">
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-orange-400"
                    >
                      <PencilIcon className="size-5" />
                      <p className="text-sm font-bold lg:text-lg">Edit</p>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-red-400"
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
