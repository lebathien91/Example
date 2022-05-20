const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
  },
  description: {
    type: String,
    maxlength: 600,
  },
  body: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("diseases", diseaseSchema);
