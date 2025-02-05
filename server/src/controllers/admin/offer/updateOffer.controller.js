const Offer = require("../../../models/offer");
const createHttpError = require("http-errors");

module.exports.updateOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      throw createHttpError(400, "El título y la descripción son obligatorios.");
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedOffer) {
      throw createHttpError(404, "La oferta no fue encontrada.");
    }

    res.json(updatedOffer);
  } catch (error) {
    next(error);
  }
};
