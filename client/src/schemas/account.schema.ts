import * as yup from "yup"


export const accountSchema = yup.object().shape({
    _id: yup.string().required(),
    account: yup.string().required(),
    cvu: yup.string().required(),
    balancePeso: yup.number().required(),
    balanceDolar: yup.number().required()                             
});

export const cardSchema = yup.object().shape({
    _id: yup.string(),
    name: yup.string(),
    cardNumber: yup.string(),
    expirationDate : yup.string(),
    cvv: yup.string(),
    type: yup.string(),
    account: yup.string(),
});

