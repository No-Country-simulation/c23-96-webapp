const mongoose = require("mongoose");
const cuenta = require("./cuenta");
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es requerido"],
  },
  dni: {
    type: Number,
    required: [true, "El DNI es requerido"],
  },
  correo: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
    //Colocar validacion de correo
  },
  numeroCuenta: {
    type: Schema.Types.ObjectId,
    ref: cuenta,
  },
  username: {
    type: String,
    required: [true, "El username es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La password es requerida"],
  },
  rol: {
    value: ["admin", "comun", "Empresa"],
  },
});

module.exports = mongoose.model("cliente", clienteSchema);
