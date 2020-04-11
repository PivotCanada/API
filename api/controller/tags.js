const Tag = require("../models/tag");
const mongoose = require("mongoose");

// Exports

exports.create = (req, res) => {
  Tag.find({ name: req.body.name })
    .exec()
    .then((tag) => {
      if (tag.length >= 1) {
        res.status(422).json({
          status: "fail",
          message: "Tag already exists",
        });
      } else {
        let tag = new Tag({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
        });
        tag
          .save()
          .then((tag) => {
            res.status(201).json({
              status: "success",
              data: tag,
            });
          })
          .catch((error) => {
            // TODO: Create Standardized Error Response!
            res.status(500).json({
              status: "error",
              message: error.message,
            });
          });
      }
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
  Tag.find({ name: { $regex: req.params.query, $options: "i" } })
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
  Tag.findOne({ _id: req.params.tagId })
    .exec()
    .then((tag) =>
      res.status(200).json({
        status: "success",
        data: tag,
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
  Tag.find({})
    .exec()
    .then((tags) => {
      res.status(200).json({
        status: "success",
        data: tags,
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
  Tag.remove({ _id: req.params.tagId })
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
