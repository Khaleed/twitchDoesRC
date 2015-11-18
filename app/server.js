 "use strict";
 
 let twitch = require('./twitch');
 let keyhandler = require('./keyhandler');

 twitch.start();

 let consumeVotes = () => {
 	let votes = twitch.getVotes();
 	console.log("consuming!!");
 	let inputs = Object.keys(votes).map(key => votes[key]);
 	let inputsToMoves = {
 		"moveLeft()": "left",
 		"moveRight()": "right",
 		"moveUp()": "up",
 		"moveDown()": "down"
 	};
 	let filteredInputs = inputs.filter(input => inputsToMoves.hasOwnProperty(input));
 	// no legal moves
 	if (filteredInputs.length == 0) {
 		twitch.clearVotes();
 		return setTimeout(consumeVotes, 10000);
 	}
 	let finalInput = filteredInputs.map(input => {
 		return {
 			input: input,
 			votes: votes[input]
 		}
 	}).reduce((top, current) => { // [ {input: "left", votes: 40}, {input:"right", votes:20} ]
 		if (top.votes < current.votes) {
 			return current;
 		} else {
 			return top;
 		}
 	}).input;
 	console.log("moving with", inputsToMoves[finalInput]);
 	keyhandler.sendKey(inputsToMoves[finalInput]);
 	twitch.clearVotes();
 	setTimeout(consumeVotes, 10000);
 };
 console.log("launching!!");
 setTimeout(consumeVotes, 10000);