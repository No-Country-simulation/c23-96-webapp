import { StateCreator } from "zustand";
import { UserState } from "@/types/storeTypes";


export const userSlice: StateCreator<UserState> = (set) => ({
    user: JSON.parse(localStorage.getItem("authUser") || "null"),
  
    getUser: () => {
      const userLocalStorage = localStorage.getItem("authUser");
      set({ user: userLocalStorage ? JSON.parse(userLocalStorage) : null });
    },
  
    setUser: (user) => {
      set({ user });
      localStorage.setItem("authUser", JSON.stringify(user));
    },
  
    clearUser: () => {
      set({ user: null });
      localStorage.removeItem("authUser");
    },
  });
  