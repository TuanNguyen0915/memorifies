import axios from "axios"

export const getUserByClerkId = async (clerkId) => {
  const {data} = await axios.get(`/api/user/${clerkId}`)
  return data
}