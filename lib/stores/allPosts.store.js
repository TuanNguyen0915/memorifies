import { create } from "zustand"

export const useAllPostsStore = create((set) => ({
  allPosts: [],
  setAllPosts: (posts) => set({ allPosts: posts }),
}))
