import { Schema, model, models } from "mongoose"

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    savePosts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    likePosts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    followings: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    default: [],
  },
  { timestamps: true },
)

const User = models.User || model("User", userSchema)
export default User
