const Post = require("../models/post");
const mongoose = require("mongoose");

// Exports

exports.create = (req, res) => {
  let post = new Post({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    link: req.body.link,
    author: req.body.author,
    likes: req.body.likes,
    tags: req.body.tags,
  });
  post
    .save()
    .then((post) => {
      res.status(201).json({
        status: "success",
        data: post,
      });
    })
    .catch((error) => {
      // TODO: Create Standardized Error Response!
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};

// Update

exports.update = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    {
      text: req.body.text,
      link: req.body.link,
      author: req.body.author,
      likes: req.body.likes,
      tags: req.body.tags,
    },
    // NOTE : Returns the 'new' updates document
    { new: true }
  )
    .exec()
    .then((post) => {
      res.status(200).json({
        status: "success",
        data: post,
      });
    })
    .catch((error) => {
      // TODO: Create Standardized Error Response!
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};

// search

exports.search = (req, res) => {
  Tag.find({ name: { $regex: req.query.name, $options: "i" } })
    .exec()
    .then((tags) =>
      res.status(200).json({
        status: "success",
        data: tags,
      })
    )
    .catch((error) => {
      // TODO: Create Standardized Error Response!
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};

// get

exports.get = (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .exec()
    .then((post) =>
      res.status(200).json({
        status: "success",
        data: post,
      })
    )
    .catch((error) => {
      // TODO: Create Standardized Error Response!
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};

// get all

exports.all = (req, res) => {
  Post.find({})
    .exec()
    .then((posts) => {
      res.status(200).json({
        status: "success",
        data: posts,
      });
    })
    .catch((error) => {
      // TODO: Create Standardized Error Response!
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};

// delete

exports.delete = (req, res) => {
  Post.remove({ _id: req.params.postId })
    .exec()
    .then(() => {
      res.status(200).json({
        status: "success",
        data: null,
      });
    })
    .catch((error) => {
      // TODO: Create Standardized Error Response!
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};
