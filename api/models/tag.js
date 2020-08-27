const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  // Name

  name: { type: String, required: true },

  // Type

  type: { type: String, required: true, default: "general" },

  // Activity Logs

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tag", TagSchema);
