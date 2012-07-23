var assert = require('assert'),
    redis = require('../index');

module.exports = {
  'should load locally': function() {
      var redisClient = redis.createClient();

      assert.isNotNull(redisClient);
      assert.eql(redisClient.port, 6379);
      assert.eql(redisClient.host, "127.0.0.1");
      assert.isNotNull(redis.redis);

      redisClient.quit();
  },

  'should load when in heroku': function() {
      var currentREDISTOGO_URL = process.env.REDISTOGO_URL;
      process.env.REDISTOGO_URL = "redis://user:password@chubb.redistogo.com:9332/";


      var redisClient = redis.createClient();
      redisClient.on('error', function (err) {
          assert.includes(err.toString(), 'invalid password');
          redisClient.quit();
          process.exit(0); // this is not great, but I have not found any other way to stop the test suite...
      });

      assert.isNotNull(redisClient);
      assert.eql(redisClient.port, 9332);
      assert.eql(redisClient.host, "chubb.redistogo.com");
      assert.eql(redisClient.auth_pass, "password");
      assert.isNotNull(redis.redis);

      redisClient.quit();

      process.env.REDISTOGO_URL = currentREDISTOGO_URL;
  }
};
