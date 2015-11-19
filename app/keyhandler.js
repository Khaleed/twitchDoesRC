"use strict";

let robot = require("robotjs");

module.exports = {
	sendKey: key => {
		robot.keyToggle(key, "down");
		setTimeout(() => {
			robot.keyToggle(key, "up");
		}, 150);
	}
};