const mongoose = require("mongoose");

const raceSchema = new mongoose.Schema(
  {
    id_driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    id_rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
    },
    payment_type: {
      type: String,
      enum: {
        values: ["credit_card", "cash"],
        message: "{VALUE} is not valid payment",
      },
    },
    km_traveled: {
      type: String,
      minLength: 1,
    },
    status: {
      type: String,
      enum: {
        values: ["in-process", "pending-payment", "finish"],
        message: "{VALUE} is not valid status",
      },
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Race", raceSchema);
