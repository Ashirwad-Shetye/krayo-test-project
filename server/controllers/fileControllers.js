const asyncHandler = require("express-async-handler");
const { s3, bucketName } = require("../configs/s3");
const { uploadToS3 } = require("../configs/s3");
const {
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

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
  const userId = req.body.userId;
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
  const folder = req.params.folder;
  const filename = req.params.filename;
  const key = `${filename}`;

  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const response = await s3.send(command);
  return res
    .status(200)
    .json({ success: true, response, message: "File downloaded successfully" });
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
