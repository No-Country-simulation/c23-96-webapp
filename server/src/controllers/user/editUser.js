const userModel = require("../../models/user");

module.exports.editUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const user = await userModel.findByIdAndUpdate(id, updatedData, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario actualizado con éxito', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  };