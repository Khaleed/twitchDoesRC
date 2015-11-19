var ROWS = 40;
var COLUMNS = 40;
var GRID_SIZE = 10;

var screen = document.getElementById("screen")
    .getContext("2d");

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
  screen.clearRect(0,
                   0,
                   board[0].length * gridSize,
                   board.length * gridSize);

  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      screen.fillStyle = COLOURS[board[y][x]];
      var co = sqToCo({ x: x, y: y }, gridSize);
      screen.fillRect(co.x, co.y, gridSize, gridSize);
    }
  }
};

var MOVES = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 }
};

function objectCoordinates(board, thing) {
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      if (board[y][x] === thing) {
        return { x: x, y: y };
      }
    }
  }
};

function inBounds(board, coordinates) {
  return coordinates.x >= 0 &&
    coordinates.x < board[0].length &&
    coordinates.y >= 0 &&
    coordinates.y < board.length;
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

  window.addEventListener("keydown", function(e) {
    keyState[e.keyCode] = true;
  });

  window.addEventListener("keyup", function(e) {
    keyState[e.keyCode] = false;
  });

  setInterval(function () {
    Object.keys(KEYS)
      .filter(function(moveStr) { return keyState[KEYS[moveStr]]; })
      .forEach(inputter);
  }, 100);
};

function setupGame() {
  var board = createBoard(ROWS, COLUMNS);
  setupKeyboardInput(inputter);

  function render() {
    drawBoard(screen, board, GRID_SIZE);
    var gameState = isGameWon(board) ?
        "Game over. Mouse got the cheese! Send 'restart' to restart." :
        "";
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
