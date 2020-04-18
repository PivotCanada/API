const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Exports

// validate

exports.validate = (req, res) => {
  // TODO : use process.env import
  const token = req.headers.authorization.split(" ")[1];
  try {
    res.status(200).json({
      status: "success",
      data: jwt.verify(token, "Istanbul"),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// signup

exports.sign_up = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(422).json({
          status: "fail",
          message: "User already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            // TODO: Create Standardized Error Response!
            return res.status(500).json({
              status: "error",
              message: error.message,
            });
          } else {
            let user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              location: req.body.location,
              skills: req.body.skills,
            });
            user
              .save()
              .then((user) => {
                res.status(201).json({
                  status: "success",
                  data: user,
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

// login

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          // Do not return error message as a security measure
          status: "fail",
          message: "Authentication failed",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (error, result) => {
          if (error) {
            // TODO : Solve err Response Issue -> Handle Errors -> Review Technique
            return res.status(500).json({
              // Do not return error message as a security measure
              status: "fail",
              message: "Authentication failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
              },
              // TODO : use process.env import
              "Istanbul",
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              status: "success",
              data: {
                token: token,
                user: user,
              },
            });
          } else {
            return res.status(500).json({
              // Do not return error message as a security measure
              status: "fail",
              message: "Authentication failed",
            });
          }
        });
      }
    })
    .catch((error) => {
      // TODO: Create Standardized Error Response!
      res.status(500).json({
        // Do not return error message as a security measure
        status: "fail",
        message: "Authentication failed",
      });
    });
};

// update

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      location: req.body.location,
      skills: req.body.skills,
    },
    // NOTE : Returns the 'new' updates document
    { new: true }
  )
    .exec()
    .then((user) => {
      res.status(200).json({
        status: "success",
        data: user,
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

// exists

exports.exists = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      res.status(200).json({
        status: "success",
        data: user === null ? false : true,
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

// get

exports.get_user = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) =>
      res.status(200).json({
        status: "success",
        data: user,
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
  User.find({})
    .exec()
    .then((users) => {
      res.status(200).json({
        status: "success",
        data: users,
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
  User.remove({ _id: req.params.userId })
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
