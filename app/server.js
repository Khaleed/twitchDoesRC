// listener for receiving messages
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server); // initialise a new instance of io and pass http server
var port = process.env.port || 3000;
// var redis = require("redis");
var config = require('../config/config_local.json');
// var redisClient = redis.createClient(config.redis);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');
var fs = require("fs");
var file = "data.db";
var exists = fs.existsSync(file);

db.serialize(function() {
  if (!exists) {
  	db.run("CREATE TABLE Game_Command_History (command TEXT)");
  }
  // put in 
  var stmt = db.prepare("INSERT INTO Game_Command_History VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Game_Command" + i);
  }
  stmt.finalize();
  // select 
  db.each("SELECT rowid AS id, info as avocado FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.avocado);
  });
});

db.close();

// redisClient.set("test-key", 3000, function () {
// 	redisClient.get("test-key", function (err, val) {
// 		console.log("val is " + val);
// 	});
// });

var irc = require('irc');
var channelOwner = 'username';
var password = 'your oauth';
var channel = '#user2';

var options = {
	userName: channelOwner, // mandatory
	realName: 'nodeJS IRC client',
	// port: 6667,
	// localAddress: null,
	debug: true,
	showErrors: true,
	// autoRejoin: false,
	autoConnect: false,
	// channels: [channel],
	// secure: false,
	// selfSigned: falsße,
	// certExpired: false,
	// floodProtection: false,
	// floodProtectionDelay: 1000,
	sasl: true, // mandatory 
	password: password // twitch token
		// stripColors: false,
		// channelPrefixes: "&#",
		// messageSplit: 512,
		// encoding: ''
};
// talk to twitch 
var client = new irc.Client('irc.twitch.tv', channelOwner, options);

client.connect(function() {
	console.log(channel);
	client.join(channel, function() {
		client.say(channel, "Hello Twitch!");
		client.addListener('message', function(from, to, message) {
			console.log(from, to, message);
			if (from !== channelOwner) {
				client.say(channel, message);
			}
		});
	});
});