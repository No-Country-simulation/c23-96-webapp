const createHttpError = require("http-errors");
const accountModel = require("../../models/account");
const transactionModel = require("../../models/transaction");
const userModel = require("../../models/user");

const pesosLimit = 10; // Daily limit for "user" role users in pesos
const dollarsLimit = 10; // Daily limit for "user" role users in dollars

module.exports.cvuTransfer = async (req, res, next) => {
  try {
    const { originAccount, destinationCVU, amount, moneyType } = req.body;

    // Validaciones
    if (!originAccount || !destinationCVU || !amount) {
      throw createHttpError(400, "Todos los parámetros son obligatorios.");
    }

    if (originAccount === destinationCVU) {
      throw createHttpError(
        400,
        "Las cuentas de origen y destino no pueden ser iguales."
      );
    }

    if (amount <= 0) {
      throw createHttpError(400, "El monto debe ser mayor a 0.");
    }

    // Buscar cuentas en la base de datos
    const origin = await accountModel.findOne({ account: originAccount });
    const destination = await accountModel.findOne({ cvu: destinationCVU });

    if (!origin) {
      throw createHttpError(404, "La cuenta de origen no existe.");
    }

    if (!destination) {
      throw createHttpError(404, "La cuenta de destino no existe.");
    }

    const user = await userModel.findOne({ Account: origin._id });

    if (user?.rol === "user") {
      if (
        moneyType === "peso" &&
        origin.transferredPeso + amount > pesosLimit
      ) {
        throw createHttpError(
          400,
          "Límite diario de transferencias en pesos excedido."
        );
      }
      if (
        moneyType === "dolar" &&
        origin.transferredDolar + amount > dollarsLimit
      ) {
        throw createHttpError(
          400,
          "Límite diario de transferencias en dólares excedido."
        );
      }
    }

    if (moneyType === "peso") {
      if (origin.balancePeso < amount) {
        throw createHttpError(
          400,
          "Saldo insuficiente en la cuenta de origen."
        );
      }
      origin.balancePeso -= amount;
      destination.balancePeso += amount;
      origin.transferredPeso += amount;
    } else if (moneyType === "dolar") {
      if (origin.balanceDolar < amount) {
        throw createHttpError(
          400,
          "Saldo insuficiente en la cuenta de origen."
        );
      }

      origin.balanceDolar -= amount;
      destination.balanceDolar += amount;
      origin.transferredDolar += amount;
    } else {
      throw createHttpError(400, "Tipo de moneda inválido.");
    }

    await origin.save();
    await destination.save();

    // Create Transaction
    const transaction = await transactionModel.create({
      type: "transfer",
      amount,
      moneyType,
      originccount: origin._id,
      destinationAccount: destination._id,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: "Transferencia realizada con éxito.",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};
