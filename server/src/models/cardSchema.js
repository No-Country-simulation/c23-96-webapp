const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["peso", "dolar"],
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Acount",
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
