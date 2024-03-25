"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FollowCard from "./FollowCard"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const FollowTabs = ({ followings, followers, posts }) => {
  return (
    <Tabs defaultValue="followings" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="followings">
          Followings{" "}
          <span className="max-lg:hidden">({followings.length})</span>
        </TabsTrigger>
        <TabsTrigger value="followers">
          Followers <span className="max-lg:hidden">({followers.length})</span>
        </TabsTrigger>
        <TabsTrigger value="posts">
          Posts <span className="max-lg:hidden">({posts.length})</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="followings">
        <Card className="w-full space-y-8 p-4  hover:border focus:border">
          {followings.map((user) => (
            <FollowCard user={user} key={user.id} />
          ))}
        </Card>
      </TabsContent>
      <TabsContent value="followers">
        <Card className="w-full space-y-8 p-4 hover:border focus:border">
          {followers.map((user) => (
            <FollowCard user={user} key={user.id} />
          ))}
        </Card>
      </TabsContent>
      <TabsContent value="posts">
        <Card className="w-full space-y-8 p-4  hover:border focus:border">
          {posts.map((post) => (
            <div key={post._id} className="flexBetween w-full">
              <div className="space-y-4">
                <p className="text-lg font-bold">{post.caption}</p>
                <Button variant="outline" className="w-fit max-lg:text-sm border-indigo-300">{post.tag}</Button>
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
