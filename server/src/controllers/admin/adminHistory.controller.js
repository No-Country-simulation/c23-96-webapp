const transactionModel = require("../../models/transaction");

module.exports.history = async (req, res, next) => {
  try {
    const transactions = await transactionModel
      .find()
      .populate({
        path: "originccount",
        select: "account cvu balancePeso balanceDolar",
      })
      .populate({
        path: "destinationAccount",
        select: "account cvu balancePeso balanceDolar",
      })
      .sort({ date: -1 });

    res.status(200).json({
      message: "Historial de transacciones obtenido con éxito.",
      transactions,
    });
  } catch (error) {
    next(error);
  }
};
