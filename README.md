# heroku-redis-client

npm module to easily connect to the "redis to go" facilities in heroku (https://addons.heroku.com/redistogo)

## Installation

npm install heroku-redis-client

## Usage

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

## License
[MIT](https://github.com/cmanzana/heroku-redis-client/blob/master/MIT-LICENSE)