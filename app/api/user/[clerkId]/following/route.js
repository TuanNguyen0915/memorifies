import User from "@/lib/database/models/user.model"
import { connectToDb } from "@/lib/database/mongodb"
import { NextResponse } from "next/server"

export const POST = async (req, { params }) => {
  try {
    await connectToDb()
    const { clerkId } = params
    const { followingId } = await req.json()
    const currentUser = await User.findOne({ clerkId })
    const followingUser = await User.findById(followingId)
    const isFollowing = currentUser.followings.includes(followingId)
    if (isFollowing) {
      currentUser.followings = currentUser.followings.filter(
        (item) => item.toString() !== followingId.toString(),
      )
      followingUser.followers = followingUser.followers.filter(
        (item) => item.toString() !== currentUser._id.toString(),
      )
      Promise.all([currentUser.save(), followingUser.save()])
    } else {
      currentUser.followings.push(followingId)
      followingUser.followers.push(currentUser._id)
      Promise.all([currentUser.save(), followingUser.save()])
    }
    return NextResponse.json(
      { message: "success", currentUser },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
