const transactionModel = require("../../models/transaction");
const accountModel = require("../../models/account");

module.exports.makeTransfer = async (req, res, next) => {
  const { amount, originccount, destinationAccount } = req.body;

  try {
    //Validaciones
    if (!amount || !originccount || !destinationAccount) {
      throw new createHttpError(400, "Parámetro inválido");
    }

    if (destinationAccount === originccount) {
      throw new createHttpError(
        400,
        "La cuenta de destino y la cuenta de origen no deben ser la misma"
      );
    }

    if (amount <= 0) {
      throw new createHttpError(400, "El monto debe ser mayor a cero");
    }

    const originAccount = await accountModel.findOne({ account: originccount }); //si no funciona con account:, canbiar por "_id"
    const destinationAccount = await accountModel.findOne({
      account: destinationAccount,
    });

    if (!originAccount) {
      throw new createHttpError(400, "Cuenta origen no encontrada");
    }

    if (!destinationAccount) {
      throw new createHttpError(400, "Cuenta destino no encontrada");
    }

    if (originAccount.balance < amount) {
      throw new createHttpError(400, "Saldo insuficiente");
    }

    //Actualizar saldo
    originAccount.balancePeso -= amount;
    destinationAccount.balancePeso += amount;

    await originAccount.save();
    await destinationAccount.save();

    const transaction = new transactionModel({
      date: new Date(),
      type: "transfer",
      amount,
      originccount,
      destinationAccount,
    });

    res
      .status(200)
      .json({ message: "transacción realizada correctamente", transaction });
  } catch (error) {
    next(error);
  }
};
