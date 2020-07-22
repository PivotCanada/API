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
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  achievements: { type: String, default: "" },
  wish: { type: String, default: "" },
  challenges: { type: String, default: "" },
  goals: { type: String, default: "" },
  motivation: { type: String, default: "" },
  business: { type: String },
  years: { type: String },
  hasSite: { type: Boolean },
  location: { type: String },
  website: { type: String },
  industry: { type: String },
  photo: { type: String },

  // Profession & Skills

  // profile_image: {
  //   type: String,
  //   default: "",
  // },

  // Profession & Skills

  // skills: {
  //   type: [TagSchema],
  // },

  // Following

  following: {
    type: [],
  },

  // Followed By

  followed_by: {
    type: [],
  },

  // Likes

  likes: {
    type: [],
  },

  // profession: { type: String },

  // Activity Logs

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
