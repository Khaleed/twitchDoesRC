// listener for receiving messages
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server); // initialise new instance of io and pass http server
var port = process.env.port || 3000;
var irc = require('irc'); 
var channelOwner = 'your username';
var password = 'put your twitch OAuth here';
var channel = '#channel';

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
    // selfSigned: false,
    // certExpired: false,
    // floodProtection: false,
    // floodProtectionDelay: 1000,
    sasl: true, // mandatory 
    password: password   // twitch token
    // stripColors: false,
    // channelPrefixes: "&#",
    // messageSplit: 512,
    // encoding: ''
};

var client = new irc.Client('irc.twitch.tv', channelOwner, options);

client.connect(function(){
	console.log(channel);
	client.join(channel, function() {
		client.say(channel, "Hello Twitch!");
		client.addListener('message', function(from, to, message){
			console.log(from, to, message);
			if(from != channelOwner){
				client.say(channel, message);
			}
		});
	});
});



