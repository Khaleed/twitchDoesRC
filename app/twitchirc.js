"use strict";

let irc = require('irc');
// writing asyn funcs using threadpool removes stack trace info
// you can see errors but not which statement caused it
// to resolve this issue -> verbose()
let sqlite3 = require('sqlite3').verbose();
// secrets in env variables
let channelOwner = process.env.TWITCH_USER;
let password = process.env.TWITCH_AUTH;
let channel = '#' + channelOwner;
let options = {
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
let client = new irc.Client('irc.twitch.tv', channelOwner, options);
let currentMessages = {};

let getVotes = function() {
	let votes = [];
	Object.keys(currentVotes).forEach(key => {
		votes.push(currentVotes[key]);
		console.log("votes are: ", votes);
	});
	// here's where we'd get the valid ones
	// let legalMoves = game.getValidMoves(votes);
	// console.log(chalk.green("legalMoves are: "), legalMoves);
	// console.log(sortVotes(countVotes(legalMoves)));
	currentVotes = {};
	return votes;
};

let startIRCFeed = () => {
	client.connect(function() {
		console.log(channel);
		client.join(channel, function() {
			client.say(channel, "Hello Twitch!");
			client.addListener('message', (from, to, message) => {
				if (from !== channelOwner) {
					// global map of all msg
					currentVotes[from] = message;
				}
				console.log(chalk.blue(from), chalk.magenta(to), message);
				// if (from !== channelOwner) {
				//  client.say(channel, message);
				// }
				// // put in db
				// db.serialize(function() {
				//  // preparing a statement
				//  let stmt = db.prepare("INSERT INTO Game_Command_History VALUES (?, ?)");
				//  stmt.run("msg:" + message, from);
				//  stmt.finalize();
				//  // give me these things in the db - query Game_Command_History
				//  db.each("SELECT rowid AS id, command, user FROM Game_Command_History", function(err, row) {
				//      console.log(row);
				//      console.log(row.id + ": " + row.command + ": " + row.user);
				//  });
				// });
				// db.close();
			});
		});
	});
};