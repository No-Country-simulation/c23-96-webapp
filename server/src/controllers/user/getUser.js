const createHttpError = require("http-errors");
const userModel = require("../../models/user");

module.exports.getUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      throw createHttpError(404, "No existe el usuario");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};