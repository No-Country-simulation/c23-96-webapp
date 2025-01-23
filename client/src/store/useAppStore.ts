import { create } from "zustand";
import { authTokenSlice } from "./AuthTokenSlice";

export const useAppStore = create(authTokenSlice);
