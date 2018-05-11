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
