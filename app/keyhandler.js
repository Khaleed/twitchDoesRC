let robot = require("robotjs");

setTimeout(() => {
	// first argument is the key  to press, can be up down left right or something else
	// the second argument is either down or up, which means press or release key
  robot.keyToggle("up", "down");
  setTimeout(() => {
    robot.keyToggle("up", "up");
  }, 4000);
}, 2000);