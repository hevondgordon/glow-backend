const aws = require('aws-sdk');
const fs = require('fs');
const s3 = new aws.S3();
export function downloadFileFromS3(bucket, fileKey, filePath) {
  console.log('downloading', bucket, fileKey, filePath);
  return new Promise(function(resolve, reject) {
    const file = fs.createWriteStream(filePath);
    const stream = s3.getObject({
      Bucket: bucket,
      Key: fileKey,
    }).createReadStream();
    stream.on('error', reject);
    file.on('error', reject);
    file.on('finish', function() {
      console.log('downloaded', bucket, fileKey);
      resolve(filePath);
    });
    stream.pipe(file);
  });
};

export function uploadFileToS3(bucket, fileKey, filePath, contentType) {
  console.log('uploading', bucket, fileKey, filePath);
  const file = fs.createReadStream(filePath);
  console.log('the file was created');
  return s3.upload({
    Bucket: bucket,
    Key: fileKey,
    Body: file,
    ACL: 'public-read',
    ContentType: contentType,
  }).promise();
};
