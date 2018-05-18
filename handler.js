'use strict'

const AWS = require('aws-sdk')
global.gAWS = AWS

const request = require('request')

const BUCKET = "cron-dev-s3bucketdata" // Hardcoded bucket because lambda@edge doesn't support environment variables!!@!

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
  edge: (event, context, callback) => {
    // This routes every http request!

    // TODO:
    // Handle user auth,
    // invoke correct sub-lambda
    console.log(JSON.stringify(event, null, 2))
    console.log(JSON.stringify(context, null, 2))

    const errorResponse = (err) => {
      return {
        status: 500,
        statusDescription: "Internal Server Error",
        body: JSON.stringify(err)
      };
    }

    // Note: if anyone gets write access to system/edge.js then...
    new AWS.S3().getObject({
      Bucket: BUCKET,
      Key: "system/edge.js"
    }, function(err, data) {
      if (err) {
        console.error(err)
        return callback(null, errorResponse(err))
      }

      // Load and execute dynamic handlers from S3, woo!
      const program = data.Body.toString()
      try {
        const {request, config} = event.Records[0].cf
        Function('event', 'request', 'config', 'context', 'callback', 'require', program)(event, request, config, context, callback, require);
      } catch (e) {
        console.error(e)
        callback(null, errorResponse(e))
      }
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
