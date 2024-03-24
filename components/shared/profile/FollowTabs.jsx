import { Card } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FollowCard from "./FollowCard"

const FollowTabs = ({ followings, followers }) => {
  return (
    <Tabs defaultValue="followings" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="followings">
          Followings ({followings.length})
        </TabsTrigger>
        <TabsTrigger value="followers">
          Followers ({followers.length})
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
    </Tabs>
  )
}
export default FollowTabs
