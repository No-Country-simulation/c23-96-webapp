//TODO: Instalar Bcript
const bcript = require('bcrypt')

export const register = async(req,res, next) => {
    const {password} = req.body

    const passwordRaw = req.body.password;

    try{
    if(!password) {
        //TODO: instalar http-errors para retornar mejores errores
        console.log('Todos los Parametros son Necesarios')
    }

    //TODO: Terminar esta consulta
    const existingDNI = await "ola"

    if(existingDNI){
        console.log('el Dni ya existe');
    }

    const passwordHashed = await brcript.hash(passwordRaw, 10);

    const newUser = await 'segir'

    res.status(201).json(newUser)
    }catch(error){
        next(error);
    }




}