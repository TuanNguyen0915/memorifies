import { create } from "zustand"

export const useUserStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}))


export const useAllUsersStore = create((set) => ({
  allUsers: [],
  setAllUsers : (users) => set({allUsers: users}),
}))