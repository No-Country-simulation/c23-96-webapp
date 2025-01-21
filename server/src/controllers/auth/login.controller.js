const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const userModel = require("../../models/user");
const dotenv = require("dotenv");
dotenv.config();

module.exports.login = async (req, res, next) => {
  const dni = req.body.dni;
  const password = req.body.password;

  try {
    if (!password || !dni) {
      throw createHttpError(400, "Todos los Parametros Son Necesarios");
    }

    const user = await userModel.findOne({ dni: dni });

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcript.compare(password, user.password);

    if (!passwordMatch) {
      console.log("credenciales incorrectas");
    }

    const token = jwt.sign({ dni: user.dni }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      user,
      message: "Ingreso Correcto",
      token,
    });
  } catch (error) {
    next(error);
  }
};
