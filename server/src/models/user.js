const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "El username es requerido"],
    unique: true,
  },
  password: {
    type: Schema.Types.ObjectId,
    required: [true, "La password es requerida"],
  },
  rol: {
    value: ["admin", "comun", "Empresa"],
  },
});

module.exports = mongoose.model("user", userSchema);
