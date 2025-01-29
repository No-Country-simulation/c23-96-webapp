const createHttpError = require("http-errors");
const accountModel = require("../../models/account");
const transactionModel = require("../../models/transaction");

module.exports.cvuTransfer = async (req, res, next) => {
  try {
    const { originAccount, destinationCVU, amount } = req.body;

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
    const origin = await accountModel.findById({ cvu: originAccount });
    const destination = await accountModel.findOne({ cvu: destinationCVU });

    if (!origin) {
      throw createHttpError(404, "La cuenta de origen no existe.");
    }

    if (!destination) {
      throw createHttpError(404, "La cuenta de destino no existe.");
    }

    if (origin.balancePeso < amount) {
      throw createHttpError(400, "Saldo insuficiente en la cuenta de origen.");
    }

    // Realizar la transferencia
    origin.balancePeso -= amount;
    destination.balancePeso += amount;

    await origin.save();
    await destination.save();

    // Registrar la transacción
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
