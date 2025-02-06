import { TAccount } from "@/types";
import { TUser, TUserLocalStorage } from "@/types/function";

export type StoreState = AuthState & UserState & AccountState & CurrencyState;

type AuthState = {
  token: string | null;
  userId: string | null;
  setAuthData: (data: { user: TUser; token: string }) => void;
  clearAuthData: () => void;
  isLogged: () => boolean;
};

type UserState = {
  user: TUserLocalStorage | null;
  getUser: () => void;
  setUser: (user: TUserLocalStorage) => void;
  clearUser: () => void;
};

type AccountState = {
  account: TAccount | null;
  isPesos: boolean;
  setAccount: (account: TAccount) => void;
  toggleCurrency: () => void;
  clearAccount: () => void;
};

type CurrencyState = {
  isPesos: boolean;
  DolarPage: () => void;
  PesosPage: () => void;
};
