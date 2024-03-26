import axios from "axios"
import { Tag } from "lucide-react"
import { tags } from "../constants"

export const uploadToCloudinary = async (file) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  const uploadData = new FormData()
  uploadData.append("file", file)
  uploadData.append("upload_preset", UPLOAD_PRESET)
  uploadData.append("cloud_name", CLOUD_NAME)
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    uploadData,
  )
  const url = await res.data.url
  return url
}

export const getAllPosts = async () => {
  const { data } = await axios.get("/api/post")
  return data.allPosts
}

export const getPostById = async (postId) => {
  const { data } = await axios.get(`/api/post/${postId}`)
  return data.post
}

export const createPost = async (data) => {
  const uploadUrl = await uploadToCloudinary(data.postPhoto[0])
  data.postPhoto = uploadUrl
  const post = await axios.post("/api/post/new", { data })
  return post
}

export const updatedPost = async (data, postId) => {
  let post
  if (typeof data.postPhoto === "string") {
    post = await axios.put(`/api/post/${postId}`, { data })
  } else {
    const newUrl = await uploadToCloudinary(data.postPhoto[0])
    data.postPhoto = newUrl
    post = await axios.put(`/api/post/${postId}`, { data })
  }
  return post
}

export const deletePost = async (postId) => {
  const post = await axios.delete(`/api/post/${postId}`)
  return post
}

export const getPostTagColor = (tag)=> {
  const selectedTag = tags.find((item)=> item.name === tag)
  return selectedTag.color  
}