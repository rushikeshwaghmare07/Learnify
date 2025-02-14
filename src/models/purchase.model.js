const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = purchaseModel;
