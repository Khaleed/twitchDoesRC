 "use strict";
 
 let express = require('express');
 let app = express();
 let server = require('http').Server(app);
 let io = require('socket.io')(server);
 let irc = require('irc');
 let fs = require("fs");
 let game = require('./game');
 let chalk = require('chalk');
 // writing asyn funcs using threadpool removes stack trace info
 // see errors but not which statement caused it
 // to resolve this issue -> verbose()
 // // var sqlite3 = require('sqlite3').verbose();
 let config = require('../config/config_local.json');
 // var port = process.env.port || 3000;
 // var redis = require("redis");
 // var redisClient = redis.createClient(config.redis);
 // // var db = new sqlite3.Database('data.db');
 // return true if the file exists
 // fs.exists('data.db', function(exists) {
 //  db.serialize(function() {
 //      if (!exists) {
 //          // create a table called Game_Command_History
 //          db.run("CREATE TABLE Game_Command_History (command TEXT, user TEXT)");
 //      }
 //  });
 // }); 
 // redisClient.set("test-key", 'wow', function () {      // redis works
 //  redisClient.get("test-key", function (err, val) {
 //  	if (err) {
 //  		console.error(err);
 //  	} else {  		
 //      console.log("val is ", val);  		
 //  	}
 //  	});
 //  });

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
 let currentVotes = {};
 let consumeVotes = function() {
 	let votes = [];
 	Object.keys(currentVotes).forEach(key => {
 		votes.push(currentVotes[key]);
 		console.log("votes are: ", votes);
 	});
 	// here's where we'd get the valid ones
 	let legalMoves = game.getValidMoves(votes);
 	console.log(chalk.green("legalMoves are: "), legalMoves);
 	console.log(sortVotes(countVotes(legalMoves)));
 	currentVotes = {};
 };

 // time stamp for every 10 secs
 setInterval(consumeVotes, 10000);

 let countVotes = function(voteList) {
 	return voteList.reduce((result, current) => {
 		console.log(result, current, voteList);
 		if (typeof(result[current]) === "undefined") {
 			result[current] = 1;
 		} else {
 			result[current] += 1;
 		}
 		return result;
 	}, {});
 };

 let sortVotes = function(votes) {

 	let sortedVotes = [];
 	let done = false;

 	Object.keys(votes).forEach(language => {

 		for (let i = 0; i < sortedVotes.length && !done; i++) {
 			console.log("language", language, "votes[language]", votes[language]);
 			if (sortedVotes.length === 0) {
 				sortedVotes.push({
 					"langName": language,
 					"totalVotes": votes[language]
 				});
 				done = true;
 			} else if (votes[language] > sortedVotes[i]["totalVotes"]) {
 				sortedVotes.splice(i, 0, {
 					"langName": language,
 					"totalVotes": votes[language]
 				});
 				done = true;
 			}
 		}

 		if (!done) {
 			sortedVotes.push({
 				"langName": language,
 				"totalVotes": votes[language]
 			});
 		}
 		done = false;
 	});

 	return sortedVotes;
 };

 let printVotes = sortedVotes => {
 	sortedVotes.forEach((current, indx) => {
 		if (indx === 0) {
 			// print obj int the array
 			console.log(chalk.green(current.langName), current.totalVotes);
 		}
 	});
 };

 client.connect(function() {
 	console.log(channel);
 	client.join(channel, function() {
 		client.say(channel, "Hello Twitch!");
 		client.addListener('message', function(from, to, message) {
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