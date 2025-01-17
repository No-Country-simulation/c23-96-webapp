const mongoose = require("mongoose");

const AcountSchema = new mongoose.Schema({
  Acount: {
    type: Number,
    required: [true, "El numero de cuenta es requerido"],
    unique: true,
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
 
});

module.exports = mongoose.model("Acount", AcountSchema);
