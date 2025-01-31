const transactionModel = require("../../models/transaction");

module.exports.history = async (req, res, next) => {
  try {
    // Obtener todas las transacciones
    const transactions = await transactionModel
      .find()
      .populate({
        path: "originccount",
        select: "account cvu balancePeso balanceDolar",
      }) // 🔹 Datos de la cuenta de origen
      .populate({
        path: "destinationAccount",
        select: "account cvu balancePeso balanceDolar",
      }) // 🔹 Datos de la cuenta destino
      .sort({ date: -1 }); // 🔹 Orden descendente por fecha

    res.status(200).json({
      message: "Historial de transacciones obtenido con éxito.",
      transactions,
    });
  } catch (error) {
    next(error);
  }
};
