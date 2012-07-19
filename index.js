var redis = require('redis'),
    url = require('url');

module.exports = function () {
    var client;
    if (process.env.REDISTOGO_URL) {
        var redisURL = url.parse(process.env.REDISTOGO_URL);
        client = redis.createClient(redisURL.port, redisURL.hostname);
        client.auth(redisURL.auth.split(":")[1]);
    } else {
        client = redis.createClient();
    }

    return client;
}
