const mongoose = require("mongoose");
const cliente = require("./cliente");

const userSchema = new mongoose.Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: cliente,
  },
  password: {
    type: String,
    required: [true, "La password es requerida"],
  },
  rol: {
    value: ["admin", "comun", "Empresa"],
  },
});

module.exports = mongoose.model("user", userSchema);
