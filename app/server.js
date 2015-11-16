 "use strict";

 var fs = require("fs");
 var game = require('./game');
 var chalk = require('chalk');
 var twitch = require('./twitch');

 // tell client to connect
 twitch.start();

 var consumeVotes = function() {
 	var votes = [];
 	Object.keys(twitch.currentVotes).forEach(function(key) {
 		votes.push(twitch.currentVotes[key]);
 		console.log("votes are: ", votes);
 	});
 	// here's where we'd get the valid ones
 	var legalMoves = game.getValidMoves(votes);
 	console.log(countVotes(legalMoves));
 	twitch.currentVotes = {};
 };

 setInterval(consumeVotes, 15000);

 var countVotes = function(voteList) {
 	return voteList.reduce(function(result, current) {
 		console.log(result, current, voteList);
 		if (typeof(result[current]) === "undefined") {
 			result[current] = 1;
 		} else {
 			result[current] += 1;
 		}
 		return result;
 	}, {});
 };

 var sortVotes = function(votes) {

 	var sortedVotes = [];
 	var done = false;

 	Object.keys(votes).forEach(function(move) {

 		for (var i = 0; i < sortedVotes.length && !done; i++) {
 			console.log("move", move, "votes[move]", votes[move]);
 			if (sortedVotes.length === 0) {
 				sortedVotes.push({
 					"moveName": move,
 					"totalVotes": votes[move]
 				});
 				done = true;
 			} else if (votes[move] > sortedVotes[i]["totalVotes"]) {
 				sortedVotes.splice(i, 0, {
 					"moveName": move,
 					"totalVotes": votes[move]
 				});
 				done = true;
 			}
 		}
 		if (!done) {
 			sortedVotes.push({
 				"moveName": move,
 				"totalVotes": votes[move]
 			});
 		}
 		done = false;
 	});
 	return (sortedVotes);
 };

 var mapVotesToKey = function() {

 };
 // currently showing command votes that are in play 
 console.log(sortVotes(twitch.currentVotes));