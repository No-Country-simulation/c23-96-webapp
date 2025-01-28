const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const userModel = require("../../models/user");
const dotenv = require("dotenv");
const { sendEmail } = require("../mail/sendMail.controller");

dotenv.config();

const failedAttempts = {};

module.exports.login = async (req, res, next) => {
  const { dni, password } = req.body;

  try {
    if (!dni || !password) {
      throw createHttpError(400, "Todos los parámetros son necesarios");
    }

    const user = await userModel.findOne({ dni });

    if (!user) {
      throw createHttpError(401, "Credenciales inválidas");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Credenciales incorrectas");

      failedAttempts[dni] = (failedAttempts[dni] || 0) + 1;

      if (failedAttempts[dni] >= 3) {
        console.log("Enviando correo por múltiples intentos fallidos...");

        await sendEmail(
          user.email,
          "Confirmación de Identidad",
          `Hola ${user.name}, detectamos varios intentos fallidos de inicio de sesión en tu cuenta. Si fuiste tú, por favor confirma tu identidad.`
        );

        return res.status(403).json({
          message: "Demasiados intentos fallidos. Por favor, revisa tu correo.",
        });
      }

      return res.status(401).json({
        message: "Credenciales incorrectas",
        attempts: failedAttempts[dni],
      });
    }

    failedAttempts[dni] = 0;

    const token = jwt.sign({ dni: user.dni }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      user,
      message: "Ingreso correcto",
      token,
    });
  } catch (error) {
    next(error);
  }
};
