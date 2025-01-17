const bcript = require("bcript")
const jwt = require('jsonwebtoken')


export const login = async(req, res,next) =>{
    
    const password = req.body.password;

    try{
        if(!password){
            console.log('falta la contraseña');
        }

        const user = 'buscar usuario y ver si esta bien'

        const passwordMatch = await bcrypt.compare(password, user.pasword);

        if(!passwordMatch){
            console.log('credenciales incorrectas')
        }
        res.status(201).json(user)
    }
    catch(error){
        next(error)
    }
}