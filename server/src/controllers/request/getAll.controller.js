const requestModel = require("../models/request");

module.exports.getAll = async (req, res, next) => {
  try {
    const requests = await requestModel
      .find()
      .populate("user", "name email")
      .select("type description createdAt");
    res.status(200).json({ message: "Requests found", requests });
  } catch (error) {
    next(error);
  }
};
