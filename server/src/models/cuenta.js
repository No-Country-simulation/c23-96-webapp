const mongoose = require("mongoose");

const cuentaSchema = new mongoose.Schema({
  numeroCuenta: {
    type: Number,
    required: [true, "El numero de cuenta es requerido"],
    unique: true,
  },
  cvu: {
    type: String,
    required: [true, "El numero de cvu es requerido"],
    unique: true,
  },
  saldo: {
    type: Number,
  },
  moneda: {
    value: ["peso", "dolar"],
  },
  cuenta: {
    value: ["cuenta corriente", "cuenta de ahorro", "Credito"],
  },
});

module.exports = mongoose.model("cuenta", cuentaSchema);
