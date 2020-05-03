const mongoose = require("mongoose");

// TODO : Find a way to import this

const TagSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  // Name

  name: { type: String, required: true },

  // Activity Logs

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },

  // Name

  firstname: { type: String, required: true },
  lastname: { type: String, required: true },

  // Bio Info

  motivation: { type: String, default: "" },
  commitments: { type: String, default: "" },
  accomplishments: { type: String, default: "" },
  bio: { type: String, default: "" },

  // Location

  location: { type: String },

  // Profession & Skills

  profile_image: {
    type: String,
    default: "",
  },

  // Profession & Skills

  skills: {
    type: [TagSchema],
  },

  // Following

  following: {
    type: [],
  },

  // Followed By

  followed_by: {
    type: [],
  },

  // profession: { type: String },

  // Activity Logs

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
