import User from "../models/user.model"

const { connectToDb } = require("../mongodb")

export const createOrUpdateUser = async (id, first_name,last_name, username, img_url, email_addresses) => {
  try {
    await connectToDb()
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      { $set: {
        firstName: first_name,
        lastName: last_name,
        username: username,
        profilePhoto: img_url,
        email: email_addresses[0].email_address,
      } },
      { upsert: true, new: true },
    )
    await user.save()
  } catch (error) {
    console.log(error)
  }
}
export const deletedUserByClerkId = async (id) => {
  try {
    await connectToDb()
    await User.findOneAndDelete({ clerkId: id })
  } catch (error) {
    console.log(error)
  }
}
