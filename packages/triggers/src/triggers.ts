import * as AWS from 'aws-sdk';
// constants
const MAX_WIDTH = 100;
const MAX_HEIGHT = 100;

const s3 = new AWS.S3();
async function videoThumbnailer(event, context, callback) {
  console.log('Reading options from event:\n' +JSON.stringify(event));
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey =
    decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
}
