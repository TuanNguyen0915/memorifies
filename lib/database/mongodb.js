import mongoose from "mongoose"

let isConnected = false

export const connectToDb = async () => {
  if (isConnected) {
    console.log("Mongodb is already connected")
    return
  }
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("Mongodb is connecting")
  isConnected = true
}
