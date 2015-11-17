 "use strict";
 
 let chalk = require('chalk');
 let twitch = require('./twitch');
 let keyhandler = require('./keyhandler');

 // tell client to connect
 twitch.start();

 let consumeVotes = () => {
 	let votes = twitch.getVotes();
 	console.log("consuming!!");
 	// get the keys from the vote counter
 	let inputs = Object.keys(votes).map(key => votes[key]);
 	console.log(Object.keys(votes), inputs);
 	// filter the ones that are not legal
 	let legalMoves = ["moveLeft()", "moveRight()", "moveUp()", "moveDown()"]
 	// sort the keys
 	// maps the clean inputs to a sequence of tuples (a fixed array)
 	 		  // map it to a list of dictionary
 		  // ["left", "right"] -> [ {input: "left", votes: 40}, {input:"right", votes:20} ]

 	let filteredInputs = inputs.filter(input => legalMoves.indexOf(input) !== -1);
	console.log(votes, filteredInputs);
 	// no legal moves
 	if (filteredInputs.length == 0) {
 		twitch.clearVotes();
 		return setTimeout(consumeVotes, 5000);
 	}

 	let finalInput = filteredInputs.map(input => {
 		  	return {input: input, votes: votes[input]}
 		  }).reduce((top, current) => {
 		  	// [ {input: "left", votes: 40}, {input:"right", votes:20} ]
 		  	if (top.votes < current.votes) {
 		  		return current;
 		  	} else {
 		  		return top;
 		  	}
 		}).input;
 	// mapping clean inputs to keyboard moves
 	let inputsToMoves = {
 		"moveLeft()": "left",
 		"moveRight()": "right",
 		"moveUp()": "up",
 		"moveDown()": "down",
 	}
 	// tell don't ask principle
 	console.log("moving with", finalInput);
 	// we are sending the highest voted clean input a key 
 	keyhandler.sendKey(inputsToMoves[finalInput]);

 	// ["up". "down", "left", "right"]
 	// [30. 24, 40, 1]

 	// ["left", "up". "down", "right"]
 	//["left", "right"]

 	// a , f, 'a
 	// 'a is the map of a via the result of applying a to f
 	// [1 2 3 4] -> doubleTheNumbers -> [2 4 5 8]

 	// we need to get the index of the highest number
 	
 	// get the one with highest votes

 	twitch.clearVotes();
 	setTimeout(consumeVotes, 5000);
 };

 // time stamp

 console.log("launching!!");
 setTimeout(consumeVotes, 5000);