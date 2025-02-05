const createHttpError = require("http-errors");
const requestModel = require("../../models/request");

module.exports.updateRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, description } = req.body;

    const updatedRequest = await requestModel
      .findByIdAndUpdate(
        id,
        { type, description },
        { new: true, runValidators: true }
      )
      .select("type description createdAt");

    if (!updatedRequest) {
      throw createHttpError(404, "Solicitud no encontrada.");
    }

    res.status(200).json({
      message: "Solicitud actualizada con éxito.",
      updatedRequest,
    });
  } catch (error) {
    next(error);
  }
};
