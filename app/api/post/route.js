import Post from "@/lib/database/models/posts.model"
import { connectToDb } from "@/lib/database/mongodb"
import { NextResponse } from "next/server"

export const GET = async (req) => {
  try {
    await connectToDb()
    const allPosts = await Post.find()
      .populate("creator")
      .sort({ createdAt: -1 })
    return NextResponse.json(
      { allPosts },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
