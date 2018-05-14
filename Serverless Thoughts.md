Serverless Thoughts
===================

AWS is a nightmare that contains a tremendous power. I like to think of it as an alien spaceship with technology built by machines, for machines. My job is to stumble around and decipher mysterious runes to bring the strange technology back to humanity.

Serverless makes lambda actually usable by people and that alone is amazing.

There are many plugins and learning Serverless is almost as complicated as learning AWS, especially because choosing the right resources requires moderately intimate knowledge of the intricacies and tradeoffs of each one.

Ex. queuing messages to be processed by a lamda one could use:

- DynamoDB Streams
- Kinesis
- SQS
- SNS
- IoT MQTT

Each has different pricing, configuration, and performance considerations.

For many projects making mistakes is ok, the performance and pricing given the free tier isn't too bad. For most apps an extra 100ms latency, or paying even 10x the "optimal" isn't a big deal since it is cheap enough and fast enough. Later the bill can be analyzed for reductions, though the downside is that at different scales the optimal solution could be a completely different architecture and possibly not even be worth developing or architecting a new solution.

A lot of the tutorials involve clicking around on the web console to create resources, why isn't it easy to create a bucket in serverless.yml and reference it?

Getting custom domains requires manually creating the certificate through the AWS interface.

AWS Shenanigans
===============

Still not entireley clear if wildcard domains work with API Gateway... as of 5-11-2018 they don't!

Lambda@Edge wildcards through CloudFront may work...

Lambda@Edge doesn't support environment variables! https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-requirements-limits.html#lambda-requirements-lambda-function-configuration

Deploying an update to the Lambda@edge function takes a long time for CloudFront to update, therefore it can take 20+ minutes to make a code change and see it in action!

Debugging Lambda@Edge is wild too! https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-testing-debugging.html

    To monitor the execution of your function in CloudFront and help determine if it's working as expected, you can create logging statements for Lambda functions running on Lambda@Edge that will write to CloudWatch Logs.

    When you check for the log files, be aware that log files are stored in the Region closest to the location where the function is executed. So if you visit a website from, for example, London, you must change the Region to view the CloudWatch Logs for the London Region.

CloudFront can't cache based on `Host` with an S3 Origin, so be sure to use the S3 website origin.

Web Notes
=========

Chrome doesn't seem to set cookies on Set-Cookie headers for json responses. Using a content-type of text/html seems to work.
