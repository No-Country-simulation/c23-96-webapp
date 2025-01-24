import * as yup from "yup"

import { userSchema } from "../schemas/user.schema"

export type TUser = yup.InferType<typeof userSchema>

export type TLogin = {[k in "dni" | "password"]: TUser[k]}

export type TUserLocalStorage = Omit<TUser, 'password'> 