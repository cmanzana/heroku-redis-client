var tap = require('tap');
var redis = require('../index');

tap.test('load works', function (t) {
    var redisClient = redis.createClient();

    t.ok(redisClient, "local client created");
    t.equal(redisClient.port, 6379);
    t.equal(redisClient.host, "127.0.0.1");

    t.ok(redis.redis, "redis object available");

    t.end();

    redisClient.quit();
});