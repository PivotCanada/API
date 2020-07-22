const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const fs = require("fs"); // Needed for example below

// Controller File

const UserController = require("../controller/users");

// Routes

///

const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "OU6BQAIJPHJFF4GB5S5N",
  secretAccessKey: "4ygG6TIhSoYLf2ZjaulIufgraVidSd0mDCwQJBn8QH4",
});

const tryUpload = () => {
  console.log(req.file);

  var params = {
    Bucket: "pivot",
    Key: "file.jpg",
    Body: file,
    ACL: "public-read",
  };
  s3.putObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pivot",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
}).single("upload");

// Profile Image

router.put("/avatar/:userId", upload, UserController.avatar);

///

router.post("/validate", UserController.validate);

router.post("/signup", UserController.sign_up);

router.post("/login", UserController.login);

router.post("/verify", UserController.exists);

router.put("/:userId", UserController.update);

router.put("/follow/:userId", UserController.follow);

router.put("/unfollow/:userId", UserController.unfollow);

router.put("/followed/:userId", UserController.add_followed_by);

router.put("/unfollowed/:userId", UserController.remove_followed_by);

router.put("/like/:userId", UserController.like);

router.put("/unlike/:userId", UserController.unlike);

router.get("/all", UserController.all);

router.get("/:userId", UserController.get_user);

router.delete("/:userId", UserController.delete);

module.exports = router;
