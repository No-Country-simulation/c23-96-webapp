const requestModel = require("../../models/request");
const createHttpError = require("http-errors");

module.exports.getRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createHttpError(400, "Request ID is required.");
    }

    const request = await requestModel.findById(id);

    if (!request) {
      throw createHttpError(404, "Request not found.");
    }

    res.status(200).json({ message: "Request found", request });
  } catch (error) {
    next(error);
  }
};
