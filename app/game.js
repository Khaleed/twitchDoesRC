exports.isValidMove = function() {

	var legalMoves = {
		'k': "UP",
		'j': "DOWN",
		'h': "LEFT",
		'l': "RIGHT"
	};

	return function(move) {
		if (legalMoves[move]) {
			console.log("legal move " + move);
			return true;
		} else {
			console.log("illegal move " + move);
			return false;
		}
	};
}();

exports.getValidMoves = function(moves) {

	// moves is an array of messages.
 	return moves.filter(exports.isValidMove);
};



// isValidMove('k');
// isValidMove('q');