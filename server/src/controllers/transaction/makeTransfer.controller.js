const createHttpError = require("http-errors");
const accountModel = require("../../models/account");
const transactionModel = require("../../models/transaction");
const userModel = require("../../models/user");

const DAILY_LIMIT = 10; // Diary limit for "user" role users

async function checkDailyLimit(originAccountId, amount) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of the day

  const totalToday = await transactionModel.aggregate([
    {
      $match: {
        originccount: originAccountId,
        createdAt: { $gte: today },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  const dailyTotal = totalToday.length ? totalToday[0].totalAmount : 0;

  return dailyTotal + amount > DAILY_LIMIT;
}

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
      const exceedsLimit = await checkDailyLimit(origin._id, amount);
      if (exceedsLimit) {
        throw createHttpError(400, "Límite diario de transferencias excedido.");
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
      throw createHttpError(400, "Tipo de moneda inválido.");
    }

    await origin.save();
    await destination.save();

    // Create a new transaction
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
