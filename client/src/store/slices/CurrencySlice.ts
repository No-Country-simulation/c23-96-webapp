import { CurrencyState } from "../../types/storeTypes";
import { StateCreator } from "zustand";


export const currencySlice: StateCreator<CurrencyState> = (set) => ({
  isPesos: true,
  
  DolarPage: () => {
    set({ isPesos: false });
  },
  
  PesosPage: () => {
    set({ isPesos: true });
  },
});
