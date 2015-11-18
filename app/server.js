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
 		return setTimeout(consumeVotes, 5000);
 	}

 	let finalInput = filteredInputs.map(input => {
 		return {
 			input: input,
 			votes: votes[input]
 		}
 	}).reduce((topList, current) => {
 		// [ {input: "left", votes: 40}, {input:"right", votes:20} ]
 		let top = topList[0];
 		if (current.votes === top.votes) {
 			return topList.push(current);
 		} else {
 			return topList[Math.floor(Math.random() * topList.length)];
 		}
 	}, [{votes: 0}]).input;

 	keyhandler.sendKey(inputsToMoves[finalInput]);
 	twitch.clearVotes();
 	setTimeout(consumeVotes, 5000);
 };

 console.log("launching!!");
 setTimeout(consumeVotes, 5000);