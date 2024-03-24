"use client"
import FollowTabs from "@/components/shared/profile/FollowTabs"
import ProfileHeader from "@/components/shared/profile/ProfileHeader"
import { Button } from "@/components/ui/button"
import { followingUser, getUserByClerkId } from "@/lib/services/user.service"
import { useUserStore } from "@/lib/stores/user.store"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const ProfilePage = ({ params }) => {
  const { currentUser, setCurrentUser } = useUserStore()
  const myProfile = currentUser?.clerkId === params.clerkId
  const [userProfile, setUserProfile] = useState(null)
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getUserByClerkId(params.clerkId)
        setUserProfile(data)
      }
      fetchData()
    } catch (error) {
      console.log(error.message)
    }
  }, [params.clerkId, setUserProfile])

  const isFollow = currentUser?.followings?.filter(
    (item) => item._id === userProfile?._id,
  )
  const handleFollow = async () => {
    await followingUser(currentUser.clerkId, userProfile?._id)
    const updatedCurrentUser = await getUserByClerkId(currentUser?.clerkId)
    const updatedUser = await getUserByClerkId(userProfile.clerkId)
    setUserProfile(updatedUser)
    setCurrentUser(updatedCurrentUser)
  }

  return (
    <>
      {userProfile && (
        <div className="mt-5 w-full space-y-5">
          {/* COVER IMAGE */}
          <ProfileHeader
            myProfile={myProfile}
            setCurrentUser={setCurrentUser}
          />
          <div className="flexCenter z-50 w-full -translate-y-16 flex-col gap-10 lg:-translate-y-24">
            <Image
              src={userProfile?.profilePhoto}
              width={100}
              height={100}
              alt="avatar"
              className="rounded-full object-cover object-center ring ring-ring lg:h-[150px] lg:w-[150px]"
            />
            <div className="flexCenter w-full flex-col">
              <p className="text-xl font-bold tracking-wide text-primary brightness-150 lg:text-2xl">
                {userProfile?.firstName} {userProfile?.lastName}
              </p>
              <p className="italic text-muted-foreground max-lg:text-xs">
                @{userProfile?.username}
              </p>
              <div className="flexCenter mt-10 w-full">
                {!myProfile &&
                  currentUser &&
                  (isFollow?.length === 0 ? (
                    <Button variant="custom" onClick={handleFollow}>
                      Follow
                    </Button>
                  ) : (
                    <Button variant="custom" onClick={handleFollow}>
                      Unfollow
                    </Button>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-full">
            <FollowTabs
              followings={
                myProfile ? currentUser?.followings : userProfile?.followings
              }
              followers={
                myProfile ? currentUser?.followers : userProfile?.followers
              }
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ProfilePage
