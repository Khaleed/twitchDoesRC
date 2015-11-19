 "use strict";

 let twitch = require('./twitch');
 let keyhandler = require('./keyhandler');

 twitch.start();

 let resetVotes = () => {
 	twitch.clearVotes();
 	return setTimeout(consumeVotes, 5000);
 };
 
 let countVotes = (inputs) => {
 	return inputs.reduce((voteTally, input) => {
 		voteTally[input] = voteTally[input] || 0;
 		voteTally[input]++;
 		return voteTally;
 	}, {});
 };

 let consumeVotes = () => {
 	// {
 	// 	twitchuser: "moveUp()", ...
 	// }
 	let votes = twitch.getVotes();

 	// [ "moveUp()", "moveDown()", 'moveDown()', 'MoveDown()', 'moveFront()' ...] 
 	let inputs = Object.keys(votes).map(key => votes[key]);
 	let validInputsToMoves = {
 		"moveLeft()": "left",
 		"moveRight()": "right",
 		"moveUp()": "up",
 		"moveDown()": "down"
 	};

 	// [ "moveUp()", "moveDown()", 'moveDown()' ...] 
 	let validInputs = inputs.filter(input => validInputsToMoves.hasOwnProperty(input));
 	if (validInputs.length == 0) {
 		return resetVotes();
 	}
 	
 	// {moveUp(): 1, moveDown(): 2}
 	let voteTally = countVotes(validInputs);
 	
 	// get the top most voted move
 	let max = Object.keys(voteTally).reduce((max, input) => {
 		// (0, voteTally["moveUp()"])
 		// (1, voteTally["moveDown()"])
 		// 2
 		return voteTally[input] > max ? voteTally[input] : max;
 	}, 0);
 	
 	// [ "moveUp()", "moveDown()"] -> ["moveDown()"]
 	let maxVotedInputs = Object.keys(voteTally).filter((input) => {
 		return voteTally[input] === max;
 	});

 	// choose a random max vote to solve the tie
 	let finalInput = maxVotedInputs[Math.floor(Math.random() * maxVotedInputs.length)];
 	console.log("moving with", validInputsToMoves[finalInput]);
 	keyhandler.sendKey(validInputsToMoves[finalInput]);
 	resetVotes();
 };
 console.log("launching!!");
 setTimeout(consumeVotes, 5000);