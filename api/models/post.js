const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  // Name

  text: { type: String, required: true },

  // Link

  link: { type: String, default: "" },

  // Created By

  author: { type: Object, default: {} },

  // Likes

  likes: {
    type: [],
  },

  // Posts

  tags: {
    type: [],
  },

  role: { type: String, default: "" },
  context: { type: String, default: "" },
  children: { type: [] },

  // Activity Logs

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
