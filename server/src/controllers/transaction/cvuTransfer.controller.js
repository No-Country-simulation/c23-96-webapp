const accountModel = require("../../models/account");
const userModel = require("../../models/user");
const transactionModel = require("../../models/transaction");
const createHttpError = require("http-errors");

module.exports.makeTransfer = async (req, res, next) => {
  const { username, cvu, amount } = req.body;
  const { user } = req.body;

  try {
    if (!amount || (!username && !cvu)) {
      throw createHttpError(
        400,
        "Todos los parámetros son necesarios (username o cvu, y amount)"
      );
    }

    if (amount <= 0) {
      throw createHttpError(400, "El monto debe ser mayor a 0.");
    }

    const originAccount = await accountModel.findOne({ _id: user.Account });
    if (!originAccount) {
      throw createHttpError(404, "Cuenta de origen no encontrada");
    }

    let destinationAccount;

    if (username) {
      const destinationUser = await userModel.findOne({ username });
      if (!destinationUser) {
        throw createHttpError(404, "Usuario destino no encontrado");
      }
      destinationAccount = await accountModel.findOne({
        _id: destinationUser.Account,
      });
    } else if (cvu) {
      // Buscar directamente la cuenta por CVU
      destinationAccount = await accountModel.findOne({ cvu });
    }

    if (!destinationAccount) {
      throw createHttpError(404, "Cuenta de destino no encontrada");
    }

    if (originAccount.balancePeso < amount) {
      throw createHttpError(400, "Saldo insuficiente en la cuenta de origen");
    }

    originAccount.balancePeso -= amount;
    destinationAccount.balancePeso += amount;

    await originAccount.save();
    await destinationAccount.save();

    const transaction = await transactionModel.create({
      type: "transferencia",
      amount,
      originAccount: originAccount._id,
      destinationAccount: destinationAccount._id,
    });

    res.status(201).json({
      message: "Transferencia realizada con éxito",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};
