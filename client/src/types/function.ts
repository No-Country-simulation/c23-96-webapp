import * as yup from "yup"

import { userSchema } from "../schemas/user.schema"

export type TUser = yup.InferType<typeof userSchema>

