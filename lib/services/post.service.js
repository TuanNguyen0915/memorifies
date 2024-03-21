import axios from "axios"


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

export const createPost = async (data) => {
  const uploadUrl = await uploadToCloudinary(data.postPhoto[0])
  data.postPhoto = uploadUrl
  const newPost = await axios.post("/api/post/new", { data })
  return newPost
}

export const getAllPosts = async () => {
  const {data} = await axios.get("/api/post")
  return data.allPosts
}