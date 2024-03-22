import Post from "@/lib/database/models/posts.model"
import User from "@/lib/database/models/user.model"
import { connectToDb } from "@/lib/database/mongodb"
import { NextResponse } from "next/server"


export const POST = async (req) => {
  try {
    await connectToDb()
    const body = await req.json()
    const post = await Post.create({
      creator: body.data.creator,
      caption: body.data.caption,
      postPhoto: body.data.postPhoto,
      tag: body.data.tag,
    })

    await User.findByIdAndUpdate(
      body.data.creator,
      {
        $push: {
          posts: post._id,
        },
      },
      { new: true },
    )
    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
