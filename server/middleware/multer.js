const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3, bucketName } = require("../configs/s3");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "private",
    key: (req, file, cb) => {
      const userId = req.params.userId;
      const timestamp = Date.now().toString();
      const originalname = file.originalname.replace(/\s+/g, "");
      cb(null, `${userId}_${timestamp}_${originalname}`);
    },
  }),
});

module.exports = { upload };
