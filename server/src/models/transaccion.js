const mongoose = require("mongoose");
const cuenta = require("./cuenta");

const transaccionSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  tipo: {
    value: ["ingreso", "egreso"],
  },
  monto: {
    type: Number,
    required: [true, "El monto es requerido"],
  },
  saldo: {
    type: Schema.Types.ObjectId,
    ref: cuenta,
  },
  cuentaOrigen: {
    type: Schema.Types.ObjectId,
    ref: cuenta,
  },
  cuentaDestino: {
    type: Schema.Types.ObjectId,
    ref: cuenta,
  },
});

module.exports = mongoose.model("transaccion", transaccionSchema);
