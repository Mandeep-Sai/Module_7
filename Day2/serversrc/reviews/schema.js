const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  comment: {
    type: String,
  },
  rate: {
    type: Number,
  },
  projectId: String,
});

const reviewModel = model("review", reviewSchema);

module.exports = reviewModel;
//module.exports = model("project", projectSchema);
