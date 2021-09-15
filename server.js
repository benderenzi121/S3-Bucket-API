const express = require("express"),
  PORT = process.env.PORT || 5000;

var AWS = require("aws-sdk");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const s3 = new AWS.S3({
  accessKeyId: process.env.BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(cors());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", (req, res, next) => {
  res.send("API is runnig");
});

app.post(
  "/upload",
  [cors(corsOptions), upload.single("image")],
  async (req, res) => {
    const file = req.file;
    console.log(file);

    const description = req.body.description;
    res.send("success").status(200);
  }
);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
