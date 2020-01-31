
const s3Util = require('./s3-util');
const childProcessPromise = require('./child-process-promise');
const path = require('path');
const os = require('os');
const EXTENSION = '.mp4';
const THUMB_WIDTH = 240;
const OUTPUT_BUCKET = 'glow-bucket';
const MIME_TYPE = 'image/*';

exports.handler = function(eventObject, context) {
  const eventRecord = eventObject.Records && eventObject.Records[0];
  const inputBucket = eventRecord.s3.bucket.name;
  const key = eventRecord.s3.object.key;
  const id = context.awsRequestId;
  const resultKey = key.replace(EXTENSION, '_THUMBNAIL.jpg');
  const workdir = os.tmpdir();
  const inputFile = path.join(workdir, id + path.extname(key));
  console.log('input file: ' + resultKey);
  const outputFile = path.join(workdir, 'converted-' + id + '.jpg');
  console.log('converting', inputBucket, key, 'using', inputFile);
  return s3Util.downloadFileFromS3(inputBucket, key, inputFile)
      .then(() => childProcessPromise.spawn(
          '/opt/ffmpeg/ffmpeg',
          [
            '-loglevel', 'error', '-y', '-i',
            inputFile, '-vf',
            `thumbnail,scale=${THUMB_WIDTH}:-1`,
            '-frames:v', '1', outputFile,
          ],
          {env: process.env, cwd: workdir}
      )).then( async () => {
        const upload = await s3Util.uploadFileToS3(
            OUTPUT_BUCKET, resultKey, outputFile, MIME_TYPE
        );
        console.log(JSON.stringify(upload));
      }
      );
};
