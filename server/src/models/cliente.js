const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es requerido"],
    unique: true,
  },
  dni: {
    type: Number,
    required: [true, "El DNI es requerido"],
  },
  correo: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "El username es requerido"],
    unique: true,
  },
  numeroCuenta: {
    type: Number,
    unique: true,
  },
});

module.exports = mongoose.model("cliente", clienteSchema);
