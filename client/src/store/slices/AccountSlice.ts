import { StateCreator } from "zustand";
import { AccountState } from "@/types/storeTypes";


export const accountSlice: StateCreator<AccountState> = (set) => ({
    account: JSON.parse(localStorage.getItem("account") || "null"),
    isPesos: true,
  
    setAccount: (account) => {
      set({ account });
      localStorage.setItem("account", JSON.stringify(account));
    },
  
    toggleCurrency: () => {
      set((state) => ({ isPesos: !state.isPesos }));
    },
  
    clearAccount: () => {
      set({ account: null });
      localStorage.removeItem("account");
    },
  });
  