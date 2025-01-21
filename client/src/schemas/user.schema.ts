import * as yup from "yup"

export const userSchema = yup.object().shape({
    name: yup.string().required().min(3, 'minimo tienen que ser 3 caracteres'),
    lastname: yup.string(),
    dni: yup.string(),
    password: yup.string(),
    username: yup.string().min(5, 'minimo tienen que ser 5 caracteres') ,
    email: yup.string().email(),
    phone: yup.string(),
    address: yup.string(),
})






