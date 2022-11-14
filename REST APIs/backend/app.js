const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require(`multer`);

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const { v4: uuidv4 } = require("uuid");

const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// app.use(bodyParser.urlencoded()); // default data when submitted through <from></from>: x-www-form-urlencoded,

app.use(bodyParser.json()); // application/json
app.use(
  // extract single file stored in some fields named image in the incoming requests
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
// construct an absolute path to the images folder
app.use("/images", express.static(path.join(__dirname, "images")));
// add new Header to the responses
app.use((req, res, next) => {
  // Allow to access from any clients
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  // allow methods
  res.setHeader(
    `Access-Control-Allow-Methods`,
    `GET, POST, PUT, PATCH, DELETE`
  );
  // headers that the requests sent from client can contain
  res.setHeader(`Access-Control-Allow-Headers`, `Content-Type, Authorization`);
  next();
});

app.use(`/feed`, feedRoutes);
app.use(`/auth`, authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message || 500;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(
    "mongodb+srv://taskapp:Dbdev1234@cluster0.2lb1a.mongodb.net/messages"
  )
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
