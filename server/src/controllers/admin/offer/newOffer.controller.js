const offerModel = require("../../../models/offer");
const userModel = require("../../../models/user");

module.exports.newOffer = async (req, res, next) => {
  try {
    const { title, description, discountPercentage, expirationDate } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const offer = await offerModel.create({
      title,
      description,
      discountPercentage,
      expirationDate,
      createdBy: user._id,
    });
    return res.status(201).json({ message: "Offer created", offer });
  } catch (error) {
    next(error);
  }
};
