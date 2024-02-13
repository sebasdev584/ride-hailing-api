const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema(
  {
    latitud: {
      type: mongoose.Schema.Types.Decimal128,
      minLength: 3,
    },
    longitud: {
      type: mongoose.Schema.Types.Decimal128,
      minLength: 3,
    },
    email_rider: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rider", riderSchema);
