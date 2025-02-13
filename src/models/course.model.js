const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
