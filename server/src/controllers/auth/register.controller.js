const { createNewAccount } = require("../../utils/newAccount");
const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const userModel = require("../../models/user");
const { createDebitCards } = require("../../utils/newCards");

module.exports.register = async (req, res, next) => {
  const { name, lastname, email, phone, address, dni, username, password } =
    req.body;
  const passwordRaw = req.body.password;

  try {
    if (!password) {
      throw createHttpError(400, "Todos los parámetros son necesarios");
    }

    //Comprueba si existe el DNI
    const existingDNI = await userModel.findOne({ dni: dni });
    if (existingDNI) {
      throw createHttpError(400, "El DNI ya existe");
    }

    //Comprueba si existe el correo
    const existingEmail = await userModel.findOne({ email: email });
    if (existingEmail) {
      throw createHttpError(400, "El correo ya existe");
    }

    // Hash de contraseña
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    // Crear una nueva cuenta (esperar el resultado)
    const account = await createNewAccount();

    //crear una tarjeta de credito
    const { pesoCard, dolarCard } = await createDebitCards(account._id, `${name} ${lastname}`);
    // Crear el usuario
    const newUser = await userModel.create({
      name,
      lastname,
      dni,
      email,
      Account: account._id,
      username,
      phone,
      address,
      password: passwordHashed,
    });

    res.status(201).json({ newUser, account, cards: { pesoCard, dolarCard } });
  } catch (error) {
    next(error);
  }
};
