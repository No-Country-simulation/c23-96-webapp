import { TUser } from ".";

export type TLogin = {[k in "dni" | "password"]: TUser[k]}

export type TUserLocalStorage = Omit<TUser, 'password'> 


export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  token?: string;
};

