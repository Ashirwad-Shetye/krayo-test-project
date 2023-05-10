const asyncHandler = require("express-async-handler");
const { s3, bucketName } = require("../configs/s3");
const { uploadToS3 } = require("../configs/s3");
const {
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");

// POST - upload file
const uploadFile = asyncHandler(async (req, res) => {
  const { file } = req;
  const userId = req.body.userId;
  const { error, key } = uploadToS3({ file, userId });
  if (error) return res.status(500).json({ message: error.message });
  if (!file || !userId)
    return res.status(404).json({ error: "Invalid request" });
  return res.status(201).json({ message: "File uploaded successfully", key });
});

// GET - list files
const getFiles = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const params = {
    Bucket: bucketName,
    Prefix: `${userId}/`,
  };

  const command = new ListObjectsV2Command(params);
  const response = await s3.send(command);

  return res.status(200).json({ response });
});

// GET - download file
const downloadFile = asyncHandler(async (req, res) => {
  const { key } = req.params;
  console.log(key);

  const params = {
    Bucket: bucketName,
    Key: key,
  };
  const fileStream = fs.createWriteStream(`/${key}.zip`);
  const command = new GetObjectCommand(params);
  const downloadStream = s3.getObject(params).createReadStream();

  // Set the content type of the response
  res.setHeader("Content-Type", "application/octet-stream");

  // Set the content disposition of the response to attachment
  res.setHeader("Content-Disposition", "attachment; filename=largefile.zip");

  // Pipe the download stream to the response
  downloadStream.pipe(res);
  // await s3
  //   .send(command)
  //   .createReadStream()
  //   .on("error", function (err) {
  //     console.log(err);
  //   })
  //   .on("data", function (chunk) {
  //     fileStream.write(chunk);
  //     return res.status(201).json({
  //       success: true,
  //       response,
  //       message: "Initiating download",
  //     });
  //   })
  //   .on("end", function () {
  //     fileStream.end();
  //     return res.status(200).json({
  //       success: true,
  //       response,
  //       message: "File downloaded successfully",
  //     });
  //   });
});

// DELETE - delete file
const deleteFile = asyncHandler(async (req, res) => {
  const key = req.params.id;

  const s3Params = {
    Bucket: bucketName,
    Key: key,
  };

  s3.deleteObject(s3Params, (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete file" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "File deleted successfully" });
    }
  });
});

module.exports = {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile,
};
