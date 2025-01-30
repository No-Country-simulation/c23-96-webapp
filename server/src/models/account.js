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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("Acount", AcountSchema);
