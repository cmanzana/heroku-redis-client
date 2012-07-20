# heroku-redis-client

[![Build Status](https://secure.travis-ci.org/cmanzana/heroku-redis-client.png)](http://travis-ci.org/cmanzana/heroku-redis-client)

npm module to easily connect to the "redis to go" facilities in heroku (https://addons.heroku.com/redistogo)

## Installation

npm install heroku-redis-client

## Usage

### Using redis as your session store

    var connect = require('connect'),
        RedisStore = require('connect-redis')(connect),
        redis = require('heroku-redis-client');


    connect.createServer(
        connect.cookieParser(),
        connect.session({ store: new RedisStore({ client: redis.createClient() }), secret: 'keyboard cat' })
    );

See https://github.com/visionmedia/connect-redis/ for information on how to use the returned redisClient as your session store

### Using redis as your data store

    var redis = require('heroku-redis-client'),
        redisClient = redis.createClient();
    redisClient.set('key', 'value');

See https://github.com/mranney/node_redis for information on how to use the wrapped redis

## Source

    var redis = require('redis'),
        url = require('url');

    exports.createClient = function (port_arg, host_arg, options) {
        var client;
        if (process.env.REDISTOGO_URL) {
            var redisURL = url.parse(process.env.REDISTOGO_URL);
            client = redis.createClient(redisURL.port, redisURL.hostname, options);
            client.auth(redisURL.auth.split(":")[1]);
        } else {
            client = redis.createClient(port_arg, host_arg, options);
        }

        return client;
    };

    exports.redis = redis;


## License

[MIT](https://github.com/cmanzana/heroku-redis-client/blob/master/MIT-LICENSE)