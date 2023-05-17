const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const { protect } = require("../middleware/auth");

const upload = multer({ storage, limits: { fileSize: 1000000000 } });

const {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile,
} = require("../controllers/fileControllers");

router.get("/all/:userId", protect, getFiles);

router.post("/upload", protect, upload.single("file"), uploadFile);

router.get("/download/:userId/:key", protect, downloadFile);

router.delete("/remove/:userId/:key", protect, deleteFile);

module.exports = router;
