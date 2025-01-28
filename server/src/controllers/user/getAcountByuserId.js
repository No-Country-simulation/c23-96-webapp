const createHttpError = require("http-errors");
const userModel = require("../../models/user");
const accountModel = require("../../models/account");

module.exports.getAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscar usuario por ID
    const user = await userModel.findById(id).populate("Account");

    if (!user) {
      throw createHttpError(404, "No existe el usuario");
    }

    const account = user.Account;

    if (!account) {
      throw createHttpError(404, "No se encontró la cuenta asociada al usuario");
    }

    res.status(200).json(account);
    console.log(account)
  } catch (error) {
    next(error);
  }
};
