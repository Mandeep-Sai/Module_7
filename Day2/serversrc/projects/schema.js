const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  studentId: String,
});

const projectModel = model("project", projectSchema);

module.exports = projectModel;
//module.exports = model("project", projectSchema);
