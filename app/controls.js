"use strict";

export default function isValidMove () {
	// this could be a tool to learn to code
	// where the commands are basic functions
	// moveLeft()
	// moveRight()
	// etc
	var legalMoves = {
		'k': "UP",
		'j': "DOWN",
		'h': "LEFT",
		'l': "RIGHT"
};
	return function(move) {
	// 	// if (legalMoves[move]) {
	return true;
	// 	// 	console.log("legal move " + move);
	// 	// 	return true;
	// 	// } else {
	// 	// 	console.log("illegal move " + move);
	// 	// 	return false;
	// 	// }
}();

export default function getValidMoves (moves) {
	// moves is an array of messages.
 	return moves.filter(exports.isValidMove);
};

// isValidMove('k');
// isValidMove('q');