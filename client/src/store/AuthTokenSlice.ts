import { getAccountData } from "@/network/fetchApiUsers";
import { TAccount } from "@/types";
import { TUser, TUserLocalStorage } from "@/types/function";
import { StateCreator } from "zustand";

type AuthState = {
  user: TUserLocalStorage | null;
  token: string | null;
  account: TAccount[];
  setAuthData: (data: { user: TUser; token: string }) => void;
  clearAuthData: () => void;
  getToken: () => void;
  getUser: () => void;
  isLogged: () => boolean;
  // getAccountData: (account: {data: TAccount[]}) => void;
};

export const authTokenSlice: StateCreator<AuthState> = (set, get) => ({
  account: [],
  user: (() => {
    const userLocalStorage = localStorage.getItem("authUser");
    return userLocalStorage ? JSON.parse(userLocalStorage) : null;
  })(),
  token: (() => {
    const tokenLocalStorage = localStorage.getItem("authToken");
    return tokenLocalStorage || null;
  })(),

  setAuthData: ({ user, token }) => {
    set({ user, token });
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", token);
  },

  getToken: () => {
    const tokenLocalStorage = localStorage.getItem("authToken");
    set({ token: tokenLocalStorage || null });
  },

  getUser: () => {
    const userLocalStorage = localStorage.getItem("authUser");
    const parsedUser = userLocalStorage ? JSON.parse(userLocalStorage) : null;
    set({ user: parsedUser });
  },

  clearAuthData: () => {
    set({ user: null, token: null });
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  },

  isLogged: () => {
    const { user, token } = get();
    return user !== null && token !== null;
  },



});
