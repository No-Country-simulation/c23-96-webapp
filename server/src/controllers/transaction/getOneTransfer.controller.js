const createHttpError = require("http-errors");
const transactionModel = require("../../models/transaction");

module.exports.getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await transactionModel
      .findById(id)
      .populate("originAccount destinationAccount");

    if (!transaction) {
      throw createHttpError(404, "La transferencia no existe.");
    }

    res.status(200).json({
      message: "Transferencia encontrada con éxito.",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};
