import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/database/mongodb"
import Post from "@/lib/database/models/posts.model"
import User from "@/lib/database/models/user.model"

export const POST = async (req, { params }) => {
  try {
    await connectToDb()
    const { postId } = params
    const { userId } = await req.json()
    let user = await User.findById(userId)
    let selectPost = await Post.findById(postId)
    let isLike = user.likePosts.includes(postId)
    if (isLike) {
      user.likePosts = user.likePosts.filter(
        (item) => item.toString() !== postId.toString(),
      )
      selectPost.likes = selectPost.likes.filter(
        (item) => item.toString() !== userId.toString(),
      )
      Promise.all([user.save(), selectPost.save()])
    } else {
      user.likePosts.push(postId.toString())
      selectPost.likes.push(userId.toString())
      Promise.all([user.save(), selectPost.save()])
    }
   
    return NextResponse.json({ selectPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
