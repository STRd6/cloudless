// Hardcoded bucket because lambda@edge doesn't support environment variables!!@!
const BUCKET = "cron-dev-s3bucketdata"

const AWS = require('aws-sdk')

const host = request.headers.host[0].value
const path = request.uri

console.log(host, path)
console.log(request)

if (request.uri === '/favicon.ico') {
  base64ImageData = "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"

  const response = {
    status: '200',
    statusDescription: 'OK',
    headers: {
      'cache-control': [{
        key: 'Cache-Control',
        value: 'max-age=600'
      }],
      'content-type': [{
        key: 'Content-Type',
        value: 'image/png'
      }]
    },
    body: base64ImageData,
    bodyEncoding: 'base64',
  };

  return callback(null, response)
}

key = request.uri.substr(1)

new AWS.S3().getObject({
  Bucket: BUCKET,
  Key: key
}, function(err, data) {
  if (err) {
    console.error(err)
    return callback(err)
  }

  // Load and execute dynamic handlers from S3, woo!
  const program = data.Body.toString()
  try {
    Function('event', 'request', 'config', 'context', 'callback', 'require', program)(event, request, config, context, callback, require);
  } catch (e) {
    console.error(e)
    callback(e)
  }
});
