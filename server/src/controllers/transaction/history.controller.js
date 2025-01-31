const transactionModel = require("../../models/transaction");
const accountModel = require("../../models/account");
const createHttpError = require("http-errors");

module.exports.history = async (req, res, next) => {
  try {
    const { account } = req.body;

    if (!account) {
      throw createHttpError(400, "El número de cuenta es obligatorio.");
    }

    // Search account by account number
    const userAccount = await accountModel.findOne({ account });

    if (!userAccount) {
      throw createHttpError(404, "No se encontró una cuenta con ese número.");
    }

    // Search transactions
    const transactions = await transactionModel
      .find({
        $or: [
          { originAccount: userAccount._id },
          { destinationAccount: userAccount._id },
        ],
      })
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
      message: "Transacciones recibidas con éxito.",
      transactions,
    });
  } catch (error) {
    next(error);
  }
};
