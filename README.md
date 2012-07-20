# heroku-redis-client

npm module to easily connect to the "redis to go" facilities in heroku (https://addons.heroku.com/redistogo)

## Installation

npm install heroku-redis-client

## Usage

Notice that when not in heroku (e.g.: testing in our local machine), it will try to connect to your localhost on redis
default port

### Using redis as your session store

    var connect = require('connect'),
        RedisStore = require('connect-redis')(connect),
        redisClient = require('heroku-redis-client')();


    connect.createServer(
        connect.cookieParser(),
        connect.session({ store: new RedisStore({ client: redisClient }), secret: 'keyboard cat' })
    );

See https://github.com/visionmedia/connect-redis/ for information on how to use the returned redisClient as your session store

### Using redis as your data store

    var redisClient = require('heroku-redis-client')()
    redisClient.set('key', 'value');

See https://github.com/mranney/node_redis for information on how to use the returned redisClient

## Source

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


## License
[MIT](https://github.com/cmanzana/heroku-redis-client/blob/master/MIT-LICENSE)