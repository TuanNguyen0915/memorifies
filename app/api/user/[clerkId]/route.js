import User from "@/lib/database/models/user.model"
import { connectToDb } from "@/lib/database/mongodb"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
  try {
    await connectToDb()
    const user = await User.findOne({ clerkId: params.clerkId })
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
