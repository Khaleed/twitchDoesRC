 "use strict";

 let twitch = require('./twitch');
 let keyhandler = require('./keyhandler');

 twitch.start();

 let resetVotes = () => {
 	twitch.clearVotes();
 	return setTimeout(consumeVotes, 5000);
 };
 
 let countVotes = inputs => {
 	return inputs.reduce((voteTally, input) => {
 		voteTally[input] = voteTally[input] || 0;
 		voteTally[input]++;
 		return voteTally;
 	}, {});
 };

 let consumeVotes = () => {
 	// {
 	// 	twitchuser: "up()", ...
 	// }
 	let votes = twitch.getVotes();
 	console.log(votes);

 	// [ "up()", "down()", 'down()', 'Down()', 'Front()' ...] 
 	let inputs = Object.keys(votes).map(key => votes[key]);
 	let validInputsToMoves = {
 		"left()": "left",
 		"right()": "right",
 		"up()": "up",
 		"down()": "down"
 	};

 	// [ "up()", "down()", 'down()' ...] 
 	let validInputs = inputs.filter(input => validInputsToMoves.hasOwnProperty(input));
 	if (validInputs.length == 0) {
 		return resetVotes();
 	}
 	
 	// {up(): 1, down(): 2}
 	let voteTally = countVotes(validInputs);
 	
 	// get the top most voted move
 	let max = Object.keys(voteTally).reduce((max, input) => {
 		// (0, voteTally["up()"])
 		// (1, voteTally["down()"])
 		// 2
 		return voteTally[input] > max ? voteTally[input] : max;
 	}, 0);
 	
 	// [ "up()", "down()"] -> ["down()"]
 	let maxVotedInputs = Object.keys(voteTally).filter((input) => {
 		return voteTally[input] === max;
 	});

 	// choose a random popular vote if we get a tie
 	let finalInput = maxVotedInputs[Math.floor(Math.random() * maxVotedInputs.length)];
 	console.log("moving with", validInputsToMoves[finalInput]);
 	keyhandler.sendKey(validInputsToMoves[finalInput]);
 	resetVotes();
 };
 console.log("launching!!");
 setTimeout(consumeVotes, 5000);