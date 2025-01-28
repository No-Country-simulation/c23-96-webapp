const transactionModel = require("../../models/transaction");
const accountModel = require("../../models/account");
const createHttpError = require("http-errors");

module.exports.history = async (req, res, next) => {
  try {
    const userId = req.body.user._id;
    if (!userId) {
      throw createHttpError(400, "El ID del usuario es necesario");
    }

    const userAccount = await accountModel.findOne({ user: userId });

    if (!userAccount) {
      throw createHttpError(404, "El usuario no existe");
    }

    //If the user has more than one account
    const accountIds = userAccounts.map((account) => account._id);

    // finds all the transactions from this user
    const transactions = await transactionModel
      .find({
        $or: [
          { originAccount: { $in: accountIds } },
          { destinationAccount: { $in: accountIds } },
        ],
      })
      .sort({ date: -1 }); // sort by descending date

    res.status(200).json({
      message: "Transacciones recibidas con éxito.",
      transactions,
    });
  } catch (error) {
    next(error);
  }
};
