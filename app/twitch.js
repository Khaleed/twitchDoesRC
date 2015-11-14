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

let db = new sqlite3.Database('data.db');

fs.exists('data.db', function(exists) {
	db.serialize(function() {
		if (!exists) {
			// create a table called Game_Command_History
			db.run("CREATE TABLE Game_Command_History (command TEXT, user TEXT)");
		}
	});
});

// talk to twitch
let client = new irc.Client('irc.twitch.tv', channelOwner, options);
let currentMessages = {};

let getTwitchMsgs = function() {
	let msgs = [];
	Object.keys(currentMessages).forEach(key => {
		msgs.push(currentMessages[key]);
		console.log("Messages are: ", msgs);
	});
	// here's where we'd get the valid ones
	// let legalMoves = game.getValidMoves(votes);
	// console.log(chalk.green("legalMoves are: "), legalMoves);
	// console.log(sortVotes(countVotes(legalMoves)));
	currentVotes = {};
	return msg;
};

let putMsgInDb = () => {
	// put in db
	db.serialize(function() {
		// preparing a statement
		let stmt = db.prepare("INSERT INTO Game_Command_History VALUES (?, ?)");
		stmt.run("msg:" + message, from);
		stmt.finalize();
		// give me these things in the db - query Game_Command_History
		db.each("SELECT rowid AS id, command, user FROM Game_Command_History", function(err, row) {
			console.log(row);
			console.log(row.id + ": " + row.command + ": " + row.user);
		});
	});
};

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
			// echo back what user types
			// if (from !== channelOwner) {
			// 	client.say(channel, message);
			// }
			putMsgInDb();
			db.close();
		});
	});
});