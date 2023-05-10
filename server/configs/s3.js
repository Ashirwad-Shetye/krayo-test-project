// const AWS = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.BUCKET_NAME;

const uploadToS3 = async ({ file, userId }) => {
  const date = new Date();
  const key = `${userId}/${date}-${file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  try {
    await s3.send(command);
    return key;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  s3,
  bucketName,
  uploadToS3,
};
