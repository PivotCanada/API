const Promo = require("../models/Promo");
const mongoose = require("mongoose");

// Exports

// verify exist

exports.exists = (req, res) => {
  Promo.findOne({ email: req.body.email })
    .exec()
    .then((info) => {
      res.status(200).json({
        status: "success",
        data: info === null ? false : true,
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

// signup

exports.add = (req, res) => {
  Promo.find({ email: req.body.email })
    .exec()
    .then((info) => {
      if (info.length >= 1) {
        res.status(422).json({
          status: "fail",
          message: "This email has already been registered",
        });
      } else {
        let info = new Promo({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        });
        info.save().then((info) => {
          res.status(201).json({
            status: "success",
            data: info,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};

// get all

exports.all = (req, res) => {
  Promo.find()
    .then((info) => {
      res.status(201).json({
        status: "success",
        data: info,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};

// delete

exports.delete = (req, res) => {
  Promo.remove({ _id: req.params.infoId })
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
