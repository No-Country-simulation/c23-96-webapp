const offerModel = require("../../../models/offer");
const createHttpError = require("http-errors");

module.exports.cancelOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offer = await offerModel.findByIdAndDelete(id);

    if (!offer) {
      throw createHttpError(404, "La oferta no fue encontrada.");
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
