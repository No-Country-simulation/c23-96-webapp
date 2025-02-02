const offerModel = require("../../../models/offer");
const userModel = require("../../../models/user");

module.exports.updateOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const offer = await offerModel.findById(id);
    if (!offer) {
      return res.status(404).json({ message: "Not found" });
    }
    const { title, description, discountPercentage, expirationDate } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
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
