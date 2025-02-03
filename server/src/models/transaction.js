const mongoose = require("mongoose");
const cuenta = require("./account");
const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  moneyType: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, "El monto es requerido"],
  },
  extra: {
    type: String,
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
