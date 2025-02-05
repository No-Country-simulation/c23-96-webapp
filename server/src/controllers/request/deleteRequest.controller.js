const createHttpError = require("http-errors");
const requestModel = require("../../models/request");

module.exports.deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRequest = await requestModel.findByIdAndDelete(id);

    if (!deletedRequest) {
      throw createHttpError(404, "Request not found.");
    }

    res.status(200).json({ message: "Request deleted successfully." });
  } catch (error) {
    next(error);
  }
};
