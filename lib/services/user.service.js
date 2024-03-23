import axios from "axios"

export const getUserByClerkId = async (clerkId) => {
  const {data} = await axios.get(`/api/user/${clerkId}`)
  return data
}


export const likePost = async (userId, postId) => {
  const {data} = await axios.post(`/api/post/${postId}/like`, {userId})
  return data
}

export const savePost = async (userId, postId) => {
  const {data} = await axios.post(`/api/post/${postId}/save`, {userId})
  return data
}

export const followingUser = async (clerkId, followingId) => {
  const {data} = await axios.post(`/api/user/${clerkId}/following`, {followingId})
  return data
}