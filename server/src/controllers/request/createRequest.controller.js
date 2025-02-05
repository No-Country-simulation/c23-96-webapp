const createHttpError = require("http-errors");
const requestModel = require("../../models/request");

module.exports.createRequest = async (req, res, next) => {
  try {
    const { type, description } = req.body;

    if (!type || !description) {
      throw createHttpError(400, "Tipo y descripción son obligatorios.");
    }

    const newRequest = await requestModel.create({ type, description });

    res.status(201).json({
      message: "Solicitud creada con éxito.",
      request: newRequest,
    });
  } catch (error) {
    next(error);
  }
};
