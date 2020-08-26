const Post = require("../models/post");
const mongoose = require("mongoose");
const setData = require("../utils/setData");

// Exports

exports.create = (req, res) => {
  let post = new Post({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    link: req.body.link,
    author: req.body.author,
    likes: req.body.likes,
    tags: req.body.tags,
    role: req.body.role,
    context: req.body.context,
    children: req.body.children,
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

exports.update = async (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    await setData(req),
    // {
    //   text: req.body.text,
    //   link: req.body.link,
    //   author: req.body.author,
    //   likes: req.body.likes,
    //   tags: req.body.tags,
    // },
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

// exports.search = (req, res) => {
//   Tag.find({ name: { $regex: req.query.name, $options: "i" } })
//     .exec()
//     .then((tags) =>
//       res.status(200).json({
//         status: "success",
//         data: tags,
//       })
//     )
//     .catch((error) => {
//       // TODO: Create Standardized Error Response!
//       res.status(500).json({
//         status: "error",
//         message: error.message,
//       });
//     });
// };

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

// get all by user ._id

exports.userAll = (req, res) => {
  Post.find({ "author._id": req.params.userId })
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

// add Like

exports.like = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    {
      $set: {
        updated_at: Date.now(),
      },
      $addToSet: { likes: req.body.user_id },
    },
    // NOTE : Returns the 'new' updates document
    { new: true }
  )
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

exports.unlike = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    {
      $set: {
        updated_at: Date.now(),
      },
      $pullAll: { likes: [req.body.user_id] },
    },
    // NOTE : Returns the 'new' updates document
    { new: true }
  )
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

// add Child

exports.add_child = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    {
      $set: {
        updated_at: Date.now(),
      },
      $addToSet: { children: req.body.child },
    },
    // NOTE : Returns the 'new' updates document
    { new: true }
  )
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

// remove Child

exports.remove_child = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    {
      $set: {
        updated_at: Date.now(),
      },
      $pullAll: { likes: [req.body.user_id] },
    },
    // NOTE : Returns the 'new' updates document
    { new: true }
  )
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

// Search

exports.search = (req, res) => {
  let parmaters = {};

  Object.keys(req.query).forEach((key) => {
    if (key === "tags") {
      let tags = req.query.tags.split(",");

      parmaters["tags.name"] = {
        $in: tags,
      };
    } else {
      parmaters[key] = { $regex: req.query[key], $options: "i" };
    }
  });

  console.log(parmaters);

  Post.find(parmaters)
    .exec()
    .then((posts) =>
      res.status(200).json({
        status: "success",
        data: posts,
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
