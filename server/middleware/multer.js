const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3, bucketName } = require("../configs/s3");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

const storage = multer.memoryStorage();

module.exports = { upload, storage };
