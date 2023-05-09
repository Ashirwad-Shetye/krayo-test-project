const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/multer");

const {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile,
} = require("../controllers/fileControllers");

router.route("/:userId", upload.single("file")).post(uploadFile);

router.route("/:userId").get(getFiles);

router.route("/:userId/:id").get(downloadFile).delete(deleteFile);

module.exports = router;
