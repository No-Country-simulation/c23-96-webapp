import { StateCreator } from "zustand";
import { AuthState } from "@/types/storeTypes";


export const authSlice: StateCreator<AuthState> = (set, get) => ({
  token: localStorage.getItem("authToken") || null,
  userId: localStorage.getItem("authUserId") || null,
  user: JSON.parse(localStorage.getItem("authUser") || "null"),

  setAuthData: ({ user, token }) => {
    set({ token, user , userId: user._id });
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUserId", user._id);
  },

  clearAuthData: () => {
    set({ token: null, userId: null });
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUserId");
    localStorage.removeItem("authUser");
    localStorage.removeItem("account");
  },

  isLogged: () => {
    const { token, userId } = get();
    return token !== null && userId !== null;
  },
});
