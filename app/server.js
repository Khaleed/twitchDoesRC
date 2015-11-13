 "use strict";

 let express = require('express');
 let app = express();
 let server = require('http').Server(app);
 let io = require('socket.io')(server);
 let fs = require("fs");
 let game = require('./game');
 let chalk = require('chalk');
 // let config = require('../config/config_local.json');
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
 
 // time stamp for every 10 secs
 setInterval(consumeVotes, 10000);

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
 			console.log(chalk.green(current.langName), current.totalVotes);
 		}
 	});
 };
