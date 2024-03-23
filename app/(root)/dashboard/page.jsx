"use client"
import { useUserStore } from "@/lib/stores/user.store"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DashboardTable from "@/components/shared/dashboard/DashboardTable"
const DashboardPage = () => {
  const { currentUser } = useUserStore()
  
  return (
    <Table className="mt-10">
      {currentUser?.posts && (
        <>
          <TableCaption>
            <p className="group">
              Total
              <span className="mx-2 transition-all group-hover:text-foreground">
                {currentUser.firstName} {currentUser.lastName}
              </span>
              posts :
              <span className="mx-2 text-xl font-bold text-foreground">
                {currentUser.posts?.length}
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
            {currentUser.posts?.map((post) => (
              <DashboardTable
                post={post}
                updateUser={() => {}}
                key={post._id}
              />
            ))}
          </TableBody>
        </>
      )}
    </Table>
  )
}

export default DashboardPage
