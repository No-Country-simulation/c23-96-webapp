import { create } from "zustand";
import { StoreState } from "./slices/IndexSlice";
import { authSlice } from "./slices/AuthSlice";
import { userSlice } from "./slices/UserSlice";
import { accountSlice } from "./slices/AccountSlice";
import { currencySlice } from "./slices/CurrencySlice";


export const useAppStore = create<StoreState>()((...args) => ({
  ...authSlice(...args),
  ...userSlice(...args),
  ...accountSlice(...args),
  ...currencySlice(...args),
}));
