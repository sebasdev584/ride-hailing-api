const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    id_rider: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Rider",
    },
    id_race: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Race",
    },
    payment_type: {
      type: String,
      requited: true,
      enum: {
        values: ["credit_card", "cash"],
        message: "{VALUE} no es un pago válido",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["PENDING", "SUCCESS", "ERROR"],
        message: "{VALUE} no es un estado válido",
      },
    },
    reference: {
      type: String,
      required: true,
      minLength: 5,
    },
    amount: {
      type: Number,
      required: true,
      minLength: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
