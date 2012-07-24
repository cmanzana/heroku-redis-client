var assert = require('assert'),
    redis = require('../index');

describe('heroku-redis-client', function() {
    it('should load locally', function(done) {
        var redisClient = redis.createClient();

        assert.ok(redisClient);
        assert.equal(redisClient.port, 6379);
        assert.equal(redisClient.host, "127.0.0.1");
        assert.ok(redis.redis);

        redisClient.quit();

        done();
    });

    it('should load when in heroku', function(done) {
        var currentREDISTOGO_URL = process.env.REDISTOGO_URL;
        process.env.REDISTOGO_URL = "redis://user:password@chubb.redistogo.com:9332/";


        var redisClient = redis.createClient();
        redisClient.on('error', function (err) {
            assert.ok(err.toString().indexOf('invalid password') != -1);
            redisClient.quit();
            done();
        });

        assert.ok(redisClient);
        assert.equal(redisClient.port, 9332);
        assert.equal(redisClient.host, "chubb.redistogo.com");
        assert.equal(redisClient.auth_pass, "password");
        assert.ok(redis.redis);

        process.env.REDISTOGO_URL = currentREDISTOGO_URL;
    });
})
