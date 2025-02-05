const offerModel = require("../../../models/offer");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

module.exports.cancelOffer = async (req, res, next) => {
  try {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "ID no válido."));
    }


    const offer = await offerModel.findById(id);
    if (!offer) {
      return next(createHttpError(404, "La oferta no fue encontrada."));
    }

    res.status(200).json({ message: "Oferta eliminada correctamente." });

  } catch (error) {
    next(error);
  }
};
