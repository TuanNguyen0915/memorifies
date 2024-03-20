import User from "../models/user.model"

const { connectToDb } = require("../mongodb")

export const createUser = async (
  id,
  email_addresses,
  first_name,
  last_name,
  username,
  image_url,
) => {
  try {
    await connectToDb()
    const user = await User.create({
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
      username,
      profilePhoto: image_url,
    })
    return user
  } catch (error) {
    console.log(error)
  }
}
