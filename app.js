const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Route Files

const userRoutes = require("./api/routes/users");

// Mongoose Depreciation Fixes

mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

// Connect Database

mongoose.connect(
  "mongodb+srv://dalyanparker:" +
    "Waverley280" +
    // TODO: Use .ENV file for Password
    "@cluster0-ikejh.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// Morgan & Body-Parser

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

app.use("/users", userRoutes);

// Not Found

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// All Other Errors

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
