const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // TODO : use process.env import
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const decoded = jwt.verify(token, "Istanbul");
    console.log(decoded);
    // Pass on 'userData' to controller if needed ?
    // req.userData = decoded;
    // console.log(req.userData);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "auth failed",
    });
  }
};
