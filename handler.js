'use strict'

const AWS = require('aws-sdk')
const request = require('request')

module.exports = {
  bucketEvent: (event, context, callback) => {
    console.log(JSON.stringify(event, null, 2))
    console.log(JSON.stringify(context, null, 2))
    console.log(process.env)

    new AWS.S3().getObject({
      Bucket: process.env.BUCKET,
      Key: "test.js"
    }, function(err, data) {
      if (!err) {
        // Load and execute dynamic handlers from S3, woo!
        const program = data.Body.toString()
        // TODO: Security :P
        Function(program)();
      }

      callback(err, true)
    });
  },
  http: (event, context, callback) => {
    // This routes every http request!

    // TODO:
    // Handle user auth,
    // invoke correct sub-lambda
    console.log(JSON.stringify(event, null, 2))
    console.log(JSON.stringify(context, null, 2))

    const response = {
      statusCode: 200,
      headers: {
        "x-custom-header" : "My Header Value"
      },
      body: JSON.stringify(event)
    };

    callback(null, response);
  },
  s3exec: (event, context, callback) => {
    callback(null, true)
  },
  test: (event, context, callback) => {
    console.log(JSON.stringify(event, null, 2))

    callback(null, true)
  },
  run: (event, context, callback) => {
    request.post('https://requestbin.fullcontact.com/18xvx7z1', {
      json: {
        event: event,
        timestamp: new Date()
      }
    },
      (err, response, body) => {
        if (! err) {
          callback(null, { message: 'We ran your scheduled job', body })
        } else {
          callback(true, err)
        }
      }
    )
  }
}
