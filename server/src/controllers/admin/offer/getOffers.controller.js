const offerModel = require("../../../models/offer");

module.exports.getOffers = async (req, res, next) => {
  try {
    const offers = await offerModel.find().sort({ createdAt: -1 });

    res.status(200).json(offers);
  } catch (error) {
    next(error);
  }
};
