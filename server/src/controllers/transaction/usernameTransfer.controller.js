const createHttpError = require("http-errors");
const accountModel = require("../../models/account");
const transactionModel = require("../../models/transaction");
const userModel = require("../../models/user");

module.exports.usernameTransfer = async (req, res, next) => {
  try {
    const { originAccount, destinationUsername, amount, moneyType } = req.body;

    // Validaciones
    if (!originAccount || !destinationUsername || !amount) {
      throw createHttpError(400, "Todos los parámetros son obligatorios.");
    }

    if (amount <= 0) {
      throw createHttpError(400, "El monto debe ser mayor a 0.");
    }

    // Buscar cuenta de origen por ID
    const origin = await accountModel.findById(originAccount);
    if (!origin) {
      throw createHttpError(404, "La cuenta de origen no existe.");
    }

    // Buscar usuario por username
    const user = await userModel.findOne({ username: destinationUsername });
    if (!user) {
      throw createHttpError(404, "El usuario de destino no existe.");
    }

    // Buscar cuenta de destino por el usuario encontrado
    const destination = await accountModel.findOne({ user: user._id });
    if (!destination) {
      throw createHttpError(
        404,
        "El usuario de destino no tiene cuenta asociada."
      );
    }

    if (origin._id.equals(destination._id)) {
      throw createHttpError(
        400,
        "Las cuentas de origen y destino no pueden ser iguales."
      );
    }

    // Validar saldo y actualizar balances
    if (moneyType === "peso") {
      if (origin.balancePeso < amount) {
        throw createHttpError(
          400,
          "Saldo insuficiente en la cuenta de origen."
        );
      }
      origin.balancePeso -= amount;
      destination.balancePeso += amount;
    } else if (moneyType === "dolar") {
      if (origin.balanceDolar < amount) {
        throw createHttpError(
          400,
          "Saldo insuficiente en la cuenta de origen."
        );
      }
      origin.balanceDolar -= amount;
      destination.balanceDolar += amount;
    } else {
      throw createHttpError(400, "Tipo de moneda no válido.");
    }

    await origin.save();
    await destination.save();

    // Crear transacción
    const transaction = await transactionModel.create({
      type: "transfer",
      amount,
      moneyType,
      originAccount: origin._id,
      destinationAccount: destination._id,
    });

    res.status(200).json({
      message: "Transferencia realizada con éxito.",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};
