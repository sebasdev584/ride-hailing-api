const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    assigned_rider: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-ride", "pending", "free"],
        message: "{VALUE} no es un estado válido",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
