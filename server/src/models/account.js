const mongoose = require("mongoose");

const AcountSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return this._id.toString();
    },
  },
  cvu: {
    type: String,
    required: [true, "El numero de cvu es requerido"],
    unique: true,
  },
  balancePeso: {
    type: Number,
  },
  balanceDolar: {
    type: Number,
  },
  transferredPeso: {
    type: Number,
    default: 0,
  },
  transferredDolar: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Acount", AcountSchema);
