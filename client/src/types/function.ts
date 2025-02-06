import { TUser } from ".";

export type TLogin = {
  dni: string;
  password: string;
};

export type TUserLocalStorage = Omit<TUser, 'password'> 

export type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  message?: string;
  token?: string;
};

