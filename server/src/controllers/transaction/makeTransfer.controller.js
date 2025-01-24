const createHttpError = require("http-errors");
const accountModel = require("../../models/account");
const transactionModel = require("../../models/transaction");

module.exports.makeTransfer = async (req, res, next) => {
  const { originAccount, destinationAccount, amount } = req.body;

  try {
    // Validar datos
    if (!originAccount || !destinationAccount || !amount) {
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

    // search in db
    const origin = await accountModel.findOne({ account: originAccount });
    const destination = await accountModel.findOne({
      account: destinationAccount,
    }); //si no funciona con account:, canbiar por "_id"

    if (!origin) {
      throw createHttpError(404, "La cuenta de origen no existe.");
    }

    if (!destination) {
      throw createHttpError(404, "La cuenta de destino no existe.");
    }

    if (origin.balancePeso < amount) {
      throw createHttpError(400, "Saldo insuficiente en la cuenta de origen.");
    }

    // Actualizar balances
    origin.balancePeso -= amount;
    destination.balancePeso += amount;

    await origin.save();
    await destination.save();

    // Create transaction
    const transaction = await transactionModel.create({
      type: "transfer",
      amount,
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
