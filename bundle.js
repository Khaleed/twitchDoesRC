/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// Paired with Mary on this Small Game as a Proof of Concept for Twitch Plays X Project
	
	var _Object$keys = __webpack_require__(2)["default"];
	
	var ROWS = 40;
	var COLUMNS = 40;
	var GRID_SIZE = 10;
	
	var screen = document.getElementById("screen").getContext("2d");
	
	var COLOURS = {
	  "m": "grey",
	  "c": "yellow",
	  "": "black"
	};
	
	function createBoard(rows, columns) {
	  var board = [];
	  for (var y = 0; y < columns; y++) {
	    board.push([]);
	    for (var x = 0; x < columns; x++) {
	      board[y].push("");
	    }
	  }
	  addMouseAndCheeseToBoard(board);
	  return board;
	};
	
	function isGameWon(board) {
	  return objectCoordinates(board, "c") === undefined;
	};
	
	function sqToCo(square, gridSize) {
	  var x = square.x * gridSize;
	  var y = square.y * gridSize;
	  return {
	    x: x,
	    y: y
	  };
	};
	
	function addMouseAndCheeseToBoard(board) {
	  var centerY = Math.floor(board.length / 2);
	  var centerX = Math.floor(board[centerY].length / 2);
	  board[centerY][centerX] = "m";
	  board[centerY - 3][centerX + 3] = "c";
	};
	
	function drawBoard(screen, board, gridSize) {
	  screen.clearRect(0, 0, board[0].length * gridSize, board.length * gridSize);
	
	  for (var y = 0; y < board.length; y++) {
	    for (var x = 0; x < board[y].length; x++) {
	      screen.fillStyle = COLOURS[board[y][x]];
	      var co = sqToCo({
	        x: x,
	        y: y
	      }, gridSize);
	      screen.fillRect(co.x, co.y, gridSize, gridSize);
	    }
	  }
	};
	
	var MOVES = {
	  left: {
	    x: -1,
	    y: 0
	  },
	  right: {
	    x: 1,
	    y: 0
	  },
	  up: {
	    x: 0,
	    y: -1
	  },
	  down: {
	    x: 0,
	    y: 1
	  }
	};
	
	function objectCoordinates(board, thing) {
	  for (var y = 0; y < board.length; y++) {
	    for (var x = 0; x < board[y].length; x++) {
	      if (board[y][x] === thing) {
	        return {
	          x: x,
	          y: y
	        };
	      }
	    }
	  }
	};
	
	function inBounds(board, coordinates) {
	  return coordinates.x >= 0 && coordinates.x < board[0].length && coordinates.y >= 0 && coordinates.y < board.length;
	};
	
	function boardSet(board, coordinates, value) {
	  board[coordinates.y][coordinates.x] = value;
	};
	
	function move(board, vector) {
	  var mouseCo = objectCoordinates(board, "m");
	  var newMouseCo = {
	    x: mouseCo.x + vector.x,
	    y: mouseCo.y + vector.y
	  };
	
	  if (inBounds(board, newMouseCo)) {
	    boardSet(board, mouseCo, "");
	    boardSet(board, newMouseCo, "m");
	  }
	};
	
	var KEYS = {
	  "left": 37,
	  "right": 39,
	  "down": 40,
	  "up": 38,
	  "restart": 82
	};
	
	function setupKeyboardInput(inputter) {
	  var keyState = {};
	
	  window.addEventListener("keydown", function (e) {
	    keyState[e.keyCode] = true;
	  });
	
	  window.addEventListener("keyup", function (e) {
	    keyState[e.keyCode] = false;
	  });
	
	  setInterval(function () {
	    _Object$keys(KEYS).filter(function (moveStr) {
	      return keyState[KEYS[moveStr]];
	    }).forEach(inputter);
	  }, 100);
	};
	
	function setupGame() {
	  var board = createBoard(ROWS, COLUMNS);
	  setupKeyboardInput(inputter);
	
	  function render() {
	    drawBoard(screen, board, GRID_SIZE);
	    var gameState = isGameWon(board) ? "Game over. Mouse got the cheese! Send 'restart' to restart." : "";
	    document.getElementById("result").innerHTML = gameState;
	    requestAnimationFrame(render);
	  };
	
	  render();
	
	  function inputter(moveStr) {
	    if (moveStr === "restart") {
	      if (isGameWon(board)) {
	        board = createBoard(ROWS, COLUMNS);
	      } else {
	        return;
	      }
	    } else {
	      var moveVector = MOVES[moveStr];
	      if (moveVector === undefined) {
	        throw new Error("Move " + moveStr + " is invalid.");
	      } else {
	        move(board, moveVector);
	      }
	    }
	  };
	
	  return inputter;
	};
	
	var inputter = setupGame();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(10).Object.keys;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(5);
	
	__webpack_require__(7)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(10)
	  , fails   = __webpack_require__(13);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map