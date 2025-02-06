const offerModel = require("../../../models/offer");
const userModel = require("../../../models/user");

module.exports.newOffer = async (req, res, next) => {
  try {
    const { title, description  } = req.body;
    const offer = await offerModel.create({
      title,
      description,
    });
    return res.status(201).json(offer);
  } catch (error) {
    next(error);
  }
};
