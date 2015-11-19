 "use strict";

 let twitch = require('./twitch');
 let keyhandler = require('./keyhandler');

 twitch.start();

 let resetVotes = () => {
 	twitch.clearVotes();
 	return setTimeout(consumeVotes, 10000);
 };

 let countVotes = (inputs) => {
 	return inputs.reduce((voteTally, input) => {
 		voteTally[input] = voteTally[input] || 0;
 		voteTally[input]++;
 		return voteTally;
 	}, {});
 };

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

 	let validInputs = inputs.filter(input => inputsToMoves.hasOwnProperty(input));

 	if (validInputs.length == 0) {
 		return resetVotes();
 	}

 	let voteTally = countVotes(validInputs);

 	// get the top most voted move
 	let max = Object.keys(voteTally).reduce((max, input) => {
 		return voteTally[input] > max ? voteTally[input] : max;
 	}, 0);

 	let maxVotedInputs = Object.keys(voteTally).filter((input) => {
 		return voteTally[input] === max;
 	});

 	let finalInput = maxVotedInputs[Math.floor(Math.random() * maxVotedInputs.length)];

 	console.log("moving with", inputsToMoves[finalInput]);
 	keyhandler.sendKey(inputsToMoves[finalInput]);
 	resetVotes();
 };
 console.log("launching!!");
 setTimeout(consumeVotes, 10000);