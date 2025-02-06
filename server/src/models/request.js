const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: ["cancelar transferencia", "soporte técnico", "otro"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pendiente", "en proceso", "resuelta", "rechazada"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
