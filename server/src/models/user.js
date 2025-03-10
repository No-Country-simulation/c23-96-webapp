const mongoose = require("mongoose");
const Account = require("./account");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  lastname: {
    type: String,
    required: [true, "El apellido es requerido"],
  },
  dni: {
    type: String,
    required: [true, "El DNI es requerido"],
  },
  email: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Formato de correo electrónico no válido",
    },
  },
  Account: {
    type: Schema.Types.ObjectId,
    ref: Account,
  },
  username: {
    type: String,
    required: [true, "El username es requerido"],
    unique: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "La password es requerida"],
  },
  rol: {
    type: String,
    enum: ["admin", "user", "company"],
    default: "user",
  },
});

module.exports = mongoose.model("user", userSchema);
