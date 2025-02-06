import * as yup from "yup"

export const offerSchema = yup.object().shape({
    _id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    createdAt: yup.string().required(),
})

