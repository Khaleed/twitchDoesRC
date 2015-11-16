 "use strict";

 // let express = require('express');
 // let app = express();
 // let server = require('http').Server(app);
 // let io = require('socket.io')(server);
 // let fs = require("fs");
 // let game = require('./game');
 let chalk = require('chalk');
 let currentMsgs = [];
 let twitch = require('./twitch');
 let twitchIrcFeed = twitch.twitchIrcFeed;
 let getMsgs = twitch.getMsgs;
 // let mori = require('mori'); // persistent data structures
 // let config = require('../config/config_local.json');
 // let port = process.env.port || 3000;
 // let keyhandlers = require('./keyhandler');
 // let redis = require("redis");
 // let redisClient = redis.createClient(config.redis);


 // redisClient.set("test-key", 'wow', function() { // redis works
 // 	redisClient.get("test-key", function(err, val) {
 // 		if (err) {
 // 			console.error(err);
 // 		} else {
 // 			console.log("val is ", val);
 // 		}
 // 	});
 // });

 let consumeMsgs = msgs => {
 	let votes = [];
 	Object.keys(msgs).forEach(key => {
 		votes.push(msgs[key]);
 	});
 };

 // time stamp for msgs
 setInterval(consumeMsgs, 10000);

 let countVotes = voteList => {
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

 // Kara's implementation of insertion sort
 let sortVotes = votes => {

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
 			// maps and call keys
 			console.log(chalk.green(current.langName), current.totalVotes);
 		}
 	});
 };