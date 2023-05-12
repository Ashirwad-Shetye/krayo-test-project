const asyncHandler = require("express-async-handler");
const { s3, bucketName } = require("../configs/s3");
const { uploadToS3 } = require("../configs/s3");
const {
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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
  const { userId, key } = req.params;
  const params = {
    Bucket: bucketName,
    Key: `${userId}/${key}`,
  };
  const command = new GetObjectCommand(params);
  const result = await getSignedUrl(s3, command, { expiresIn: 3600 });
  res.status(200).json({ url: result });
});

// DELETE - delete file
const deleteFile = asyncHandler(async (req, res) => {
  const { userId, key } = req.params;
  const params = {
    Bucket: bucketName,
    Key: `${userId}/${key}`,
  };

  const command = new DeleteObjectCommand(params);

  const result = await s3.send(command);
  res.status(200).json({ message: "File deleted successfully", result });
});

module.exports = {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile,
};
