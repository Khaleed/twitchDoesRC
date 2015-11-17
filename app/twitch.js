"use strict"

let irc = require('irc');
let db = require('./db');
let channelOwner = process.env.TWITCH_USER;
let password = process.env.TWITCH_AUTH;
let channel = '#' + channelOwner;

let options = {
	userName: channelOwner,
	realName: 'nodeJS IRC client',
	debug: true,
	showErrors: true,
	autoConnect: false,
	sasl: true, // mandatory
	password: password // twitch token
};

let currentVotes = {};

let start = () => {
	// talk to twitch
	var client = new irc.Client('irc.twitch.tv', channelOwner, options);
	client.connect(() => {
		console.log(channel);
		client.join(channel, () => {
			client.say(channel, "Hello Twitch!");
			client.addListener('message', (from, to, message) => {
				if (from !== channelOwner) {
					// global map of all msg
					currentVotes[from] = message;
				}
				// put sqlite stuff here
				Object.keys(currentVotes).map(from => {
					db.putInDb(currentVotes[from], from);
				});
				console.log("curret votes", currentVotes); // => { beardrc: 'moveUp()', kara: 'moveDown()', sal: 'moveUp()' }
			});
		});
	});
};

module.exports = {
	getVotes: function() {
		return currentVotes;
	},
	clearVotes: function() {
		return currentVotes = {};
	},
	start: start
};