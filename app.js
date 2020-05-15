const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Config environment variables ...

// Route Files

const userRoutes = require("./api/routes/users");
const tagRoutes = require("./api/routes/tags");
const postRoutes = require("./api/routes/posts");
const searchRoutes = require("./api/routes/search");
const promoRoutes = require("./api/routes/promo");

// Mongoose Depreciation Fixes

mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

// Connect Database

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://dalyanparker:" +
        "Waverley280" +
        // TODO: Use .ENV file for Password
        "@cluster0-ikejh.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("connection to ` MongoDB ` established ..."))
  .catch((err) => console.error("could not connect to ` MongoDB ` ...", err));

// Morgan & Body-Parser

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes

app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/promo", promoRoutes);

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
      message: error.message,
    },
  });
});

module.exports = app;
