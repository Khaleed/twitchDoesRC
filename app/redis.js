var config = require('../config/config_local.json');
var redis = require("redis");
var redisClient = redis.createClient(config.redis);

