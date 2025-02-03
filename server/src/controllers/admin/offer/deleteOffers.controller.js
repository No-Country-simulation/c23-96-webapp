const offerModel = require("../../../models/offer");
const userModel = require("../../../models/user");
const createHttpError = require("http-errors");

module.exports.cancelOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offer = await offerModel.findByIdAndUpdate(
      id,
      { status: "canceled" },
      { new: true }
    );

    if (!offer) {
      throw createHttpError(404, "La oferta no fue encontrada.");
    }

    res.status(200).json({ message: "Oferta cancelada exitosamente.", offer });
  } catch (error) {
    next(error);
  }
};
