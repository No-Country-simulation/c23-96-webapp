const userModel = require("../../models/user");

module.exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  };