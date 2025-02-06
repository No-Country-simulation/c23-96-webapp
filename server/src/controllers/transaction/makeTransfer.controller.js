const createHttpError = require("http-errors");
const accountModel = require("../../models/account");
const transactionModel = require("../../models/transaction");
const userModel = require("../../models/user");

const pesosLimit = 5000000; // Daily limit for "user" role users in pesos
const dollarsLimit = 1000; // Daily limit for "user" role users in dollars

module.exports.makeTransfer = async (req, res, next) => {
  try {
    const { originAccount, destinationAccount, amount, moneyType } = req.body;

    if (!originAccount || !destinationAccount || !amount || !moneyType) {
      throw createHttpError(400, "Todos los parámetros son obligatorios.");
    }

    if (originAccount === destinationAccount) {
      throw createHttpError(
        400,
        "Las cuentas de origen y destino no pueden ser iguales."
      );
    }

    if (amount <= 0) {
      throw createHttpError(400, "El monto debe ser mayor a 0.");
    }

    const origin = await accountModel.findOne({ account: originAccount });
    const destination = await accountModel.findOne({
      account: destinationAccount,
    });

    if (!origin) throw createHttpError(404, "La cuenta de origen no existe.");
    if (!destination)
      throw createHttpError(404, "La cuenta de destino no existe.");

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
      type: type,
      amount,
      extra,
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
