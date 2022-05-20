const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    unique: true,
  },
  diseases: {
    type: [Schema.Types.ObjectId],
    ref: "diseases",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("categories", categorySchema);
