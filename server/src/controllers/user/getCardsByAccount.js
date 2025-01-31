const createHttpError = require("http-errors");
const userModel = require("../../models/user");
const cardModel = require("../../models/cardSchema");

module.exports.getCards = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscar usuario por ID
    const user = await userModel.findById(id);

    if (!user) {
      throw createHttpError(404, "No existe el usuario");
    }

    // Buscar tarjetas por Account ID
    const cards = await cardModel.find({ account: user.Account });

    if (cards.length === 0) {
      throw createHttpError(404, "No se encontraron tarjetas asociadas a la cuenta");
    }

    res.status(200).json({ cards });
  } catch (error) {
    next(error);
  }
};
