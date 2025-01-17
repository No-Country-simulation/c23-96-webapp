import { createNewAccount } from "../../utils/newAccount";

const createHttpError = require("http-errors");
const bcrypt = require('bcrypt')
const userModel = require('../../models/user')
export const register = async(req,res, next) => {
    const {name, lastname, email,phone, address , dni, username,password} = req.body

    const passwordRaw = req.body.password;

    try{
    if(!password) {
        throw createHttpError(400, "Todos los Parametros Son Necesarios")
        
    }

    const existingDNI = await userModel.findOne({dni: dni});
    if(existingDNI){
        console.log('el Dni ya existe');
    }

    const existingEmail = await userModel.findOne({email: email});
    if(existinexistingEmailgDNI){
        console.log('el correo ya existe');
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await userModel.create({
        name,
        lastname,
        dni,
        email,
        username,
        phone,
        address,
        password: passwordHashed
    })

   
    createNewAccount();
    
    res.status(201).json(newUser)
    }catch(error){
        next(error);
    }




}