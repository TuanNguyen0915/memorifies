import Post from "@/lib/database/models/posts.model"
import User from "@/lib/database/models/user.model"
import { connectToDb } from "@/lib/database/mongodb"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
  const { postId } = params

  try {
    await connectToDb()
    const post = await Post.findById(postId).populate([
      {
        path: "creator",
        model: User,
      },
    ])
    return NextResponse.json({ post }, { status: 200 })
  } catch {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const PUT = async (req, { params }) => {
  try {
    const { postId } = params
    const { data } = await req.json()
    await connectToDb()
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        creator: data.creator,
        caption: data.caption,
        postPhoto: data.postPhoto,
        tag: data.tag,
      },
      { new: true },
    )
    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


export const DELETE = async (req, {params}) => {
  try {
    const { postId } = params
    await connectToDb()
    const post = await Post.findByIdAndDelete(postId)
    const user  = await User.findById(post.creator)
    user.posts = user.posts.filter(item => item.toString() !== postId.toString())
    await user.save()
    return NextResponse.json({ post }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}