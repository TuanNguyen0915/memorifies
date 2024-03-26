"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FollowCard from "./FollowCard"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"


const FollowTabs = ({ followings, followers, posts }) => {
  const router = useRouter()
  return (
    <Tabs defaultValue="followings" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="followings">
          Followings{" "}
          <span className="max-md:hidden ml-2">({followings.length})</span>
        </TabsTrigger>
        <TabsTrigger value="followers">
          Followers <span className="max-md:hidden ml-2">({followers.length})</span>
        </TabsTrigger>
        <TabsTrigger value="posts">
          Posts <span className="max-md:hidden ml-2">({posts.length})</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="followings">
        <Card className="w-full space-y-8 border p-4 hover:border-border">
          {followings.map((user) => (
            <FollowCard user={user} key={user._id} />
          ))}
        </Card>
      </TabsContent>
      <TabsContent value="followers">
        <Card className="w-full space-y-8 p-4">
          {followers.map((user) => (
            <FollowCard user={user} key={user._id} />
          ))}
        </Card>
      </TabsContent>
      <TabsContent value="posts">
        <Card className="w-full space-y-8 p-4 ">
          {posts.map((post, idx) => (
            <div
              key={post._id}
              className={`flexBetween w-full ${idx !== posts.length - 1 && "border-b"} pb-4`}
            >
              <div className="space-y-4">
                <p className="text-lg font-bold">{post.caption}</p>
                <Button
                  variant="outline"
                  className="w-fit border-indigo-300 max-lg:text-sm"
                  onClick={() => router.push(`/?category=${post.tag}`)}
                >
                  {post.tag}
                </Button>
              </div>
              <div className="relative h-[100px] w-[100px] rounded-xl ">
                <Image
                  src={post.postPhoto}
                  alt="post's photo"
                  fill
                  className="rounded-xl object-cover object-center opacity-0 transition-all duration-1000 group-hover:scale-110"
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                />
              </div>
            </div>
          ))}
        </Card>
      </TabsContent>
    </Tabs>
  )
}
export default FollowTabs
