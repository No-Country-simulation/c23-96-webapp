const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const offerModel = require("../../../models/offer");

module.exports.deleteOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "ID no válido."));
    }

    // Buscar la oferta en la base de datos
    const offer = await offerModel.findById(id);
    if (!offer) {
      return next(createHttpError(404, "La oferta no fue encontrada."));
    }

    // Eliminar la oferta
    await offer.deleteOne();

    res.status(200).json({ message: "Oferta eliminada correctamente." });
  } catch (error) {
    next(error);
  }
};
