import User from "@/lib/database/models/user.model"
import { connectToDb } from "@/lib/database/mongodb"
import { NextResponse } from "next/server"

export const POST = async (req, { params }) => {
  try {
    await connectToDb()
    const { postId } = params
    const { userId } = await req.json()
    const user = await User.findById(userId)
  const isSaved = user.savePosts.includes(postId)
    if (isSaved) {
      user.savePosts = user.savePosts.filter(
        (item) => item.toString() !== postId.toString(),
      )
      await user.save()
    } else {
      user.savePosts.push(postId.toString())
      await user.save()
    }
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
