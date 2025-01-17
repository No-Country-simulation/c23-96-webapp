const mongoose = require("mongoose");
const Acount = require("./acount");
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
    type: Number,
    required: [true, "El DNI es requerido"],
  },
  email: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
  },
  Acount: {
    type: Schema.Types.ObjectId,
    ref: Acount,
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
    type: String
  },
  password: {
    type: String,
    required: [true, "La password es requerida"],
  },
  rol: {
    value: ["admin", "user", "company"],
    default: 'user'
  },
});

module.exports = mongoose.model("user", userSchema);
