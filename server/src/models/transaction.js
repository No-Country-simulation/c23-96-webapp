const mongoose = require("mongoose");
const cuenta = require("./acount");

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, "El monto es requerido"],
  },
  originccount: {
    type: Schema.Types.ObjectId,
    ref: cuenta,
  },
  destinationAccount: {
    type: Schema.Types.ObjectId,
    ref: cuenta,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
