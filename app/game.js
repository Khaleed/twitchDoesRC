"use strict";

export isValidMove = () => {

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
};
}();

export getValidMoves = moves => {

	// moves is an array of messages.
 	return moves.filter(exports.isValidMove);
};

// isValidMove('k');
// isValidMove('q');