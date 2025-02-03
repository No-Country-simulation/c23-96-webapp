import { TAccount } from "../types";
import { TUser, TUserLocalStorage } from "../types/function";
import { StateCreator } from "zustand";

type AuthState = {
  user: TUserLocalStorage | null;
  token: string | null;
  account: TAccount | null;
  userId: string | null;
  isPesos: boolean;
  setAuthData: (data: { user: TUser; token: string }) => void;
  clearAuthData: () => void;
  getToken: () => void;
  getUserId: () => void;
  getUser: () => void;
  isLogged: () => boolean;
  DolarPage: () => void;
  PesosPage: () => void;
  getAccount: (account: TAccount) => void;
};

export const authTokenSlice: StateCreator<AuthState> = (set, get) => ({
  account: (() => {
    const accountLocalStorage = localStorage.getItem("account");
    return accountLocalStorage ? JSON.parse(accountLocalStorage) : null;
  })(),
  isPesos: true,
  user: (() => {
    const userLocalStorage = localStorage.getItem("authUser");
    return userLocalStorage ? JSON.parse(userLocalStorage) : null;
  })(),
  token: (() => {
    return localStorage.getItem("authToken") || null;
  })(),
  userId: (() => {
    return localStorage.getItem("authUserId") || null;
  })(),

  setAuthData: ({ user, token }) => {
    const userId = user._id;
    set({ user, token, userId });
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUserId", userId);
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

  getUserId: () => {
    const userIdLocalStorage = localStorage.getItem("authUserId");
    set({ userId: userIdLocalStorage || null });
  },

  clearAuthData: () => {
    set({ user: null, token: null, userId: null, account: null });
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUserId");
    localStorage.removeItem("account");
  },

  isLogged: () => {
    const { user, token, userId } = get();
    return user !== null && token !== null && userId !== null;
  },
  
  DolarPage: () => {
    set({ isPesos: false });
  },
  
  PesosPage: () => {
    set({ isPesos: true });
  },

  getAccount: (accountData: TAccount) => {
    set({ account: accountData });
    localStorage.setItem("account", JSON.stringify(accountData));
  },
});
