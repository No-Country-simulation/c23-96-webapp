const createHttpError = require("http-errors");
const transactionModel = require("../../models/transaction");
const accountModel = require("../../models/account");

module.exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    //search transaction
    const transaction = await transactionModel.findById(id);
    if (!transaction) {
      throw createHttpError(404, "La transferencia no existe.");
    }

    const { originAccount, destinationAccount, amount, moneyType } =
      transaction;

    // search account
    const origin = await accountModel.findById(originAccount);
    const destination = await accountModel.findById(destinationAccount);

    if (!origin || !destination) {
      throw createHttpError(404, "Las cuentas involucradas no existen.");
    }

    if (moneyType === "peso") {
      origin.balancePeso += amount;
      destination.balancePeso -= amount;
    } else if (moneyType === "dolar") {
      origin.balanceDolar += amount;
      destination.balanceDolar -= amount;
    }

    await origin.save();
    await destination.save();

    // delete transaction
    await transactionModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Transferencia eliminada y saldo revertido con éxito.",
    });
  } catch (error) {
    next(error);
  }
};
