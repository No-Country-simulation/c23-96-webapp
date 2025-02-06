import { TAccount } from "../types";
import { TUser, TUserLocalStorage } from "../types/function";


export type AuthState = {
  token: string | null;
  userId: string | null;
  user: TUserLocalStorage | null;
  setAuthData: (data: { user: TUser; token: string }) => void;
  clearAuthData: () => void;
  isLogged: () => boolean;
};


export type UserState = {
  user: TUserLocalStorage | null;
  getUser: () => void;
  setUser: (user: TUserLocalStorage) => void;
  clearUser: () => void;
};


export type AccountState = {
  account: TAccount | null;
  isPesos: boolean;
  setAccount: (account: TAccount) => void;
  toggleCurrency: () => void;
  clearAccount: () => void;
};

export type CurrencyState = {
  isPesos: boolean;
  DolarPage: () => void;
  PesosPage: () => void;
};

export type StoreState = AuthState & UserState & AccountState & CurrencyState; 
