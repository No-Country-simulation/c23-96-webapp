const userModel = require("../../models/user");

module.exports.listUsers = async (req, res, next) => {
  try {
    const users = await userModel.find().populate("Account");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
