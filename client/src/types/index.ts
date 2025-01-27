import { accountSchema } from "../schemas/user.schema"
import * as yup from "yup"


export type TAccount = yup.InferType<typeof accountSchema>
