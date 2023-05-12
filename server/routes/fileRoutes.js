const express = require("express");
const router = express.Router();
const multer = require("multer");
const { s3UploadV2 } = require("../s3Service");
const { s3, bucketName } = require("../configs/s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");

const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 1000000000 } });

const {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile,
} = require("../controllers/fileControllers");

router.get("/all/:userId", getFiles);

router.post("/upload", upload.single("file"), uploadFile);

router.get("/download/:userId/:key", downloadFile);

router.delete("/remove/:userId/:key", deleteFile);

module.exports = router;
