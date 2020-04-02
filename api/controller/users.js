const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Exports

// signup

exports.sign_up = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status.json(422).json({
          message: "User already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            // TODO: Create Standardized Error Response!
            return res.status(500).json({
              error: error
            });
          } else {
            let user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              first_name: req.body.first_name,
              last_name: req.body.last_name
            });
            user
              .save()
              .then(user => {
                res.status(201).json(user);
              })
              .catch(error => {
                // TODO: Create Standardized Error Response!
                res.status(500).json(error);
              });
          }
        });
      }
    })
    .catch(error => {
      // TODO: Create Standardized Error Response!
      res.status(500).json(error);
    });
};

// login

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "auth failed"
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (error, result) => {
          if (error) {
            // TODO : Solve err Response Issue
            return res.status(401).json({
              message: "auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id
              },
              // TODO : use process.env import
              "Istanbul",
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "auth successful",
              token: token
            });
          }
        });
      }
    })
    .catch(error => {
      // TODO: Create Standardized Error Response!
      res.status(500).json(error.message);
    });
};

// get

exports.get_user = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .exec()
    .then(user => res.status(200).json(user))
    .catch(error => {
      // TODO: Create Standardized Error Response!
      res.status(500).json(error.message);
    });
};

// get all

exports.all = (req, res) => {
  User.find({})
    .exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // TODO: Create Standardized Error Response!
      res.status(500).json(error.message);
    });
};

// delete

exports.delete = (req, res) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "user deleted"
      });
    })
    .catch(error => {
      // TODO: Create Standardized Error Response!
      res.status(500).json(error.message);
    });
};
