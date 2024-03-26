import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import { getUserByClerkId } from "@/lib/services/user.service"
import { deletePost } from "@/lib/services/post.service"
import { TableCell, TableRow } from "@/components/ui/table"
import { useTransition } from "react"
import { useUserStore } from "@/lib/stores/user.store"
import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import PostLoader from "../PostLoader"

const DashboardTable = ({ post }) => {
  const router = useRouter()
  const [transitioning, startTransition] = useTransition()
  const { setCurrentUser } = useUserStore()
  const handleDelete = async () => {
    await deletePost(post._id)
    startTransition(async () => {
      const updatedUser = await getUserByClerkId(post.creator.clerkId)
      setCurrentUser(updatedUser)
    })
  }
  if (transitioning) {
    return (
      <>
        <PostLoader />
        <PostLoader />
      </>
    )
  }
  return (
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
            className="w-full gap-2 rounded-xl border-orange-400"
            onClick={() => router.push(`/post/${post._id}/edit`)}
          >
            <PencilIcon className="size-5" />
            <p className="text-sm font-bold lg:text-lg">Edit</p>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full gap-2 rounded-xl border-red-400"
              >
                <TrashIcon className="size-5" />
                <p className="text-sm font-bold lg:text-lg">Del</p>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl text-lg">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(post._id)}
                  className="rounded-xl bg-red-400 text-lg hover:bg-red-500"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default DashboardTable
