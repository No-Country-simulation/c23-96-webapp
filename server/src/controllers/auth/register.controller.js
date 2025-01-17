const {createNewAccount} = require("../../utils/newAccount");
const createHttpError = require("http-errors");
const bcrypt = require('bcrypt');
const userModel = require('../../models/user');

module.exports.register = async (req, res, next) => {
  const { name, lastname, email, phone, address, dni, username, password } = req.body;
  const passwordRaw = req.body.password;

  try {
    if (!password) {
      throw createHttpError(400, "Todos los parámetros son necesarios");
    }

  
    const existingDNI = await userModel.findOne({ dni: dni });
    if (existingDNI) {
      throw createHttpError(400, "El DNI ya existe");
    }


    const existingEmail = await userModel.findOne({ email: email });
    if (existingEmail) {
      throw createHttpError(400, "El correo ya existe");
    }

  
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    // Crear una nueva cuenta (esperar el resultado)
    const account = await createNewAccount();

    
    const newUser = await userModel.create({
      name,
      lastname,
      dni,
      email,
      Account: account.account,  
      username,
      phone,
      address,
      password: passwordHashed,
    });

    
    res.status(201).json({ newUser, account }); 
  } catch (error) {
    next(error);
  }
};
