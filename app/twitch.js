var irc = require('irc');
var channelOwner = process.env.TWITCH_USER;
var password = process.env.TWITCH_AUTH;
var channel = '#' + channelOwner;

var options = {
	userName: channelOwner,
	realName: 'nodeJS IRC client',
	debug: true,
	showErrors: true,
	autoConnect: false,
	sasl: true, // mandatory
	password: password // twitch token
};

var currentVotes = {};

var start = function() {
	// talk to twitch
	var client = new irc.Client('irc.twitch.tv', channelOwner, options);
	client.connect(function() {
		console.log(channel);
		client.join(channel, function() {
			client.say(channel, "Hello Twitch!");
			client.addListener('message', function(from, to, message) {
				if (from !== channelOwner) {
					// global map of all msg
					currentVotes[from] = message;
				}
				// put redis stuff here
				console.log(from, to, message);
			});
		});
	});
};

module.exports = {
	currentVotes: currentVotes,
	start: start
};