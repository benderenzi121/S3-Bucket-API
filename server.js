const express = require("express"),
  PORT = process.env.PORT || 5000,
  fs = require("fs");
var AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.get("/", (req, res, next) => {
  res.send("API is runnig");
});
app.post("/upload", (req, res, next) => {
  const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: "cat.jpg", // File name you want to save as in S3
      Body: fileContent,
    };
  };

  res.send("success").status(200);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
