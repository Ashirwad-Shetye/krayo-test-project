const express = require("express");
const router = express.Router();
const multer = require("multer");
const { s3UploadV2 } = require("../s3Service");

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

router.get("/get", downloadFile);

router.delete("/remove", deleteFile);

module.exports = router;
