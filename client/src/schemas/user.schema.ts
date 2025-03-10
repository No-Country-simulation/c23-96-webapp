import * as yup from "yup"

export const userSchema = yup.object().shape({
    _id: yup.string().required("El ID del usuario es requerido"),
    name: yup.string().required().min(3, 'minimo tienen que ser 3 caracteres'),
    lastname: yup.string().required(),
    dni: yup.string().required(),
    password: yup.string().required(),
    username: yup.string().required().min(5, 'minimo tienen que ser 5 caracteres') ,
    email: yup.string().email().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    rol: yup.string()
})




