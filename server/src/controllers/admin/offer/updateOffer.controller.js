const offerModel = require("../../../models/offer");
const userModel = require("../../../models/user");
const createHttpError = require("http-errors");
module.exports.updateOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offer = await offerModel.findById(id);

    if (!offer) {
      throw createHttpError(404, "Not Found.");
    }

    const { title, description, discountPercentage, expirationDate } = req.body;
    const user = await userModel.findById(req.user._id);

    if (!user) {
      throw createHttpError(401, "Unauthorized.");
    }

    offer.title = title;
    offer.description = description;
    offer.discountPercentage = discountPercentage;
    offer.expirationDate = expirationDate;
    offer.updatedBy = user._id;
    await offer.save();

    return res.status(200).json({ message: "Offeer updated", offer });
  } catch (error) {
    next(error);
  }
};
