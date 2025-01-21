const userModel = require("../../models/user");

module.exports.getCurrentUser = async (req, res) => {
  try {
    const userID = req.body.user._id;
    const user = await userModel.findOne(userID).populate("Account");

    if (!user) {
      throw createHttpError(404, "No existe el usuario");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
