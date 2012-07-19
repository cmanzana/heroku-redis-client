var tap = require('tap');

tap.test('load works', function (t) {
    var redisClient = require('../index')();

    t.ok(redisClient, "object loaded");
    t.equal(redisClient.port, 6379);
    t.equal(redisClient.host, "127.0.0.1");
    t.end();

    redisClient.quit();
});