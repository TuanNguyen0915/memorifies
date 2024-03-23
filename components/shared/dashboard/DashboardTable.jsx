import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import { getUserByClerkId } from "@/lib/services/user.service"
import { deletePost } from "@/lib/services/post.service"
import { TableCell, TableRow } from "@/components/ui/table"
import { useTransition } from "react"
import { useUserStore } from "@/lib/stores/user.store"
import { useRouter } from "next/navigation"

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
  )
}

export default DashboardTable
