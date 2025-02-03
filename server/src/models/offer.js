const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    discountPercentage: {
      type: Number,
      min: [0, "El descuento no puede ser negativo"],
      max: [100, "El descuento no puede ser mayor a 100%"],
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
    expirationDate: {
      type: Date,
      required: [true, "La fecha de expiración es obligatoria"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Se requiere un administrador para crear la oferta"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
