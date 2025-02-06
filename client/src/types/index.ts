
import * as yup from "yup";
import { userSchema } from "../schemas/user.schema";
import { accountSchema, cardSchema } from "@/schemas/account.schema";
import { offerSchema } from "@/schemas/offer.schema";
import transactionSchema from "@/schemas/transactions.schema";

export type TUser = yup.InferType<typeof userSchema>;

export type TAccount = yup.InferType<typeof accountSchema>;

export type Card = yup.InferType<typeof cardSchema>;

export type TOffer = yup.InferType<typeof offerSchema>;

export type TTransaction = yup.InferType<typeof transactionSchema>;