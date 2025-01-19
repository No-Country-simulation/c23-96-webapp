import * as yup from "yup"

export const userSchema = yup.object().shape({
    name: yup.string(),
    lastname: yup.string(),
    dni: yup.string(),
    password: yup.string(),
    username: yup.string(),
    email: yup.string(),
    phone: yup.string(),
    address: yup.string(),
})