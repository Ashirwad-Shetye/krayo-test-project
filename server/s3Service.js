const { S3 } = require("aws-sdk");
const { bucketName } = require("./configs/s3");

exports.s3UploadV2 = async (file) => {
  const s3 = new S3();

  const param = {
    Bucket: bucketName,
    Key: `uploads/name`,
    Body: file.buffer,
  };

  const result = await s3.upload(param).promise();

  return result;
};
