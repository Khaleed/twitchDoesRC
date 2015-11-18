"use strict";

let robot = require("robotjs");

module.exports = {
	sendKey: key => {
		// first argument is the key  to press, can be up or down 
		// the second is press or release key
		robot.keyToggle(key, "down");
		// once the key is pressed, you need to release it whenever  you see fit (usually 150ms)
		setTimeout(() => {
			robot.keyToggle(key, "up");
		}, 150);
	}
};