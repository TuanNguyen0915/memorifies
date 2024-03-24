import User from "@/lib/database/models/user.model"
import { connectToDb } from "@/lib/database/mongodb"
import { NextResponse } from "next/server"

export const GET = async (req) => {
  try {
    await connectToDb()
    const allUsers = await User.find({})
    return NextResponse.json({ allUsers }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
