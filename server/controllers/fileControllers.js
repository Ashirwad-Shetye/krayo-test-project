const asyncHandler = require("express-async-handler");
const { s3, bucketName } = require("../configs/s3");

// POST - upload file
const uploadFile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    name: file.originalName,
  });
});

// GET - list files
const getFiles = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const s3Params = {
    Bucket: bucketName,
    Prefix: `${userId}_`,
  };
  const s3Objects = await s3.listObjectsV2(s3Params).promise();
  const files = s3Objects.Contents.map(
    (s3Object) => s3Object.Key.split(`${userId}_`)[1]
  );
  res.status(200).json({ success: true, files: files });
});

// GET - download file
const downloadFile = asyncHandler(async (req, res) => {
  const key = req.params.id;

  const s3Params = {
    Bucket: bucketName,
    Key: key,
  };

  const s3Stream = s3.getObject(s3Params).createReadStream();
  s3Stream.pipe(res);
  res
    .status(200)
    .json({ success: true, message: "File downloaded successfully" });
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
