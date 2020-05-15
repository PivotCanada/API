const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Config environment variables ...

// TODO : Add environment variables in Heroku env and local env ...

// Exports

// upload

// TODO Fix this

exports.avatar = (req, res) => {
  if (req.file) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        profile_image: req.file.location,
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
  } else {
    res.status(500).json({
      status: "error",
      message: "No file location exists",
    });
  }
};

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
              following: [],
              followed_by: [],
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
      motivation: req.body.motivation,
      accomplishments: req.body.accomplishments,
      bio: req.body.bio,
      commitments: req.body.commitments,
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

// search

// TODO : clean this shit up
// TODO : research the $in operator

exports.search = (req, res) => {
  let parmaters = {};

  Object.keys(req.query).forEach((key) => {
    if (key === "skills") {
      let skills = req.query.skills.split(",");

      console.log(skills);

      parmaters["skills._id"] = {
        $in: skills,
      };
    } else {
      parmaters[key] = { $regex: req.query[key], $options: "i" };
    }
  });

  console.log(parmaters);

  User.find(parmaters)
    .exec()
    .then((users) =>
      res.status(200).json({
        status: "success",
        data: users,
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

// Follow

exports.follow = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { following: req.body.user } },
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

// UnFollow

exports.unfollow = (req, res) => {
  console.log(req.body.user);
  User.findOneAndUpdate(
    { _id: req.params.userId },

    { $pull: { following: req.body.user } },
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

// Followed By

exports.add_followed_by = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { followed_by: req.body.user } },
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

exports.remove_followed_by = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { followed_by: req.body.user } },
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
