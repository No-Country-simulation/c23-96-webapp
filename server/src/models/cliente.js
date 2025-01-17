const mongoose = require("mongoose");
const cuenta = require("./cuenta");
const user = require("./user");
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
  username: {
    type: Schema.Types.ObjectId,
    ref: user,
  },
  numeroCuenta: {
    type: Schema.Types.ObjectId,
    ref: cuenta,
  },
});

module.exports = mongoose.model("cliente", clienteSchema);
