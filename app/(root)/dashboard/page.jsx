"use client"
import { useUserStore } from "@/lib/stores/user.store"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DashboardTable from "@/components/shared/dashboard/Dashboard"
import { CountUp } from "use-count-up"
const DashboardPage = () => {
  const { currentUser } = useUserStore()

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-evenly">
        <div className="group h-[200px] w-[200px] space-y-7 rounded-xl border p-4 transition-all duration-500 hover:ring-1">
          <p className="w-full text-center text-lg font-semibold text-muted-foreground">
            {currentUser?.followers.length > 1 ? "Followers" : "Follower"}
          </p>
          <p className="text-center text-7xl font-extrabold text-indigo-500 transition-all duration-500 group-hover:brightness-125">
            <CountUp
              isCounting
              start={0}
              end={currentUser?.followers?.length}
              duration={3}
            />
          </p>
        </div>
        <div className="group h-[200px] w-[200px] space-y-7 rounded-xl border p-4 transition-all duration-500 hover:ring-1">
          <p className="w-full text-center text-lg font-semibold text-muted-foreground">
            {currentUser?.followings.length > 1 ? "Followings" : "Following"}
          </p>
          <p className="text-center text-7xl font-extrabold text-indigo-500 transition-all duration-500 group-hover:brightness-125">
            <CountUp
              isCounting
              start={0}
              end={currentUser?.followings?.length}
              duration={4}
            />
          </p>
        </div>
        <div className="group h-[200px] w-[200px] space-y-7 rounded-xl border p-4 transition-all duration-500 hover:ring-1">
          <p className="w-full text-center text-lg font-semibold text-muted-foreground">
            {currentUser?.posts.length > 1 ? "Posts" : "Post"}
          </p>
          <p className="text-center text-7xl font-extrabold text-indigo-500 transition-all duration-500 group-hover:brightness-125">
            <CountUp
              isCounting
              start={0}
              end={currentUser?.posts?.length}
              duration={3}
            />
          </p>
        </div>
      </div>
      <Table className="mt-10">
        {currentUser?.posts && (
          <>
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
    </div>
  )
}

export default DashboardPage
