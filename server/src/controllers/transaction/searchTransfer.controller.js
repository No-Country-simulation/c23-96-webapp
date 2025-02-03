const transactionModel = require("../../models/transaction");
const createHttpError = require("http-errors");

module.exports.getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createHttpError(400, "El ID de la transacción es necesario");
    }

    const transaction = await transactionModel
      .findById(id)
      .populate({
        path: "originccount",
        select: "account cvu balancePeso balanceDolar",
      })
      .populate({
        path: "destinationAccount",
        select: "account cvu balancePeso balanceDolar",
      });

    if (!transaction) {
      throw createHttpError(404, "Transacción no encontrada");
    }

    res.status(200).json({
      message: "Transacción encontrada.",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};
