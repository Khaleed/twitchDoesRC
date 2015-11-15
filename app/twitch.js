// basic IRC client functionality
let irc = require('irc');
let chalk = require('chalk');
let config = require('./config.js');
// let db = new sqlite3.Database('data.db');
// writing asyn funcs using threadpool removes stack trace info
// you can see errors but not which statement caused it
// to resolve this issue -> verbose()
// let sqlite3 = require('sqlite3').verbose();

// secrets in env variables
let channelOwner = process.env.TWITCH_USER;
let password = process.env.TWITCH_AUTH;
let channel = '#' + channelOwner;
// fs.exists('data.db', function(exists) {
// 	db.serialize(function() {
// 		if (!exists) {
// 			// create a table called Game_Command_History
// 			db.run("CREATE TABLE Game_Command_History (command TEXT, user TEXT)");
// 		}
// 	});
// });

// talk to twitch by connecting to an IRC server
let client = new irc.Client('irc.twitch.tv', channelOwner, options);

// let putMsgInDb = () => {
// 	// put in db
// 	db.serialize(function() {
// 		// preparing a statement
// 		let stmt = db.prepare("INSERT INTO Game_Command_History VALUES (?, ?)");
// 		stmt.run("msg:" + message, from);
// 		stmt.finalize();
// 		// give me these things in the db - query Game_Command_History
// 		db.each("SELECT rowid AS id, command, user FROM Game_Command_History", function(err, row) {
// 			console.log(row);
// 			console.log(row.id + ": " + row.command + ": " + row.user);
// 		});
// 	});
// };

let currentMsgs = {};

let getMsgs = () => {
	let msgs = [];
	Object.keys(currentMsgs).forEach(key => {
		msgs.push(currentMsgs[key]);
		console.log("Messages are: ", msgs);
	});
	// recent msgs
	currentMsgs = {};
	return msgs;
};

let twitchIrcFeed = () => {

	client.connect(function() {
		console.log(channel);
		client.join(channel, function() {
			client.say(channel, "Hello Twitch!");
			client.addListener('message', (from, to, message) => {
				if (from !== channelOwner) {
					// global map of all msg
					currentMsgs[from] = message;
				}
				console.log(chalk.blue(from), chalk.magenta(to), chalk.green(message));
				// echo back what user types
				// if (from !== channelOwner) {
				// 	client.say(channel, message);
				// }
				// putMsgInDb();
				// db.close();
			});
		});
	});
};

export {
	twitchIrcFeed, getMsgs
}