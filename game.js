"use strict";

// Paired with Mary on this Small Game as a Proof of Concept for Twitch Plays X Project 
// Group of people playing on Twitch guide a mouse to the cheese

let ROWS = 40;
let COLUMNS = 40;
let GRID_SIZE = 10;

let screen = document.getElementById("screen")
  .getContext("2d");

let COLOURS = {
  "m": "grey",
  "c": "yellow",
  "": "black"
};

function createBoard(rows, columns) {
  let board = [];
  for (let y = 0; y < columns; y++) {
    board.push([]);
    for (let x = 0; x < columns; x++) {
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
  let x = square.x * gridSize;
  let y = square.y * gridSize;
  return {
    x: x,
    y: y
  };
};

function addMouseAndCheeseToBoard(board) {
  let centerY = Math.floor(board.length / 2);
  let centerX = Math.floor(board[centerY].length / 2);
  board[centerY][centerX] = "m";
  board[centerY - 3][centerX + 3] = "c";
};

function drawBoard(screen, board, gridSize) {
  screen.clearRect(0,
    0,
    board[0].length * gridSize,
    board.length * gridSize);

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      screen.fillStyle = COLOURS[board[y][x]];
      let co = sqToCo({
        x: x,
        y: y
      }, gridSize);
      screen.fillRect(co.x, co.y, gridSize, gridSize);
    }
  }
};

let MOVES = {
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
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
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
  return coordinates.x >= 0 &&
    coordinates.x < board[0].length &&
    coordinates.y >= 0 &&
    coordinates.y < board.length;
};

function boardSet(board, coordinates, value) {
  board[coordinates.y][coordinates.x] = value;
};

function move(board, vector) {
  let mouseCo = objectCoordinates(board, "m");
  let newMouseCo = {
    x: mouseCo.x + vector.x,
    y: mouseCo.y + vector.y
  };

  if (inBounds(board, newMouseCo)) {
    boardSet(board, mouseCo, "");
    boardSet(board, newMouseCo, "m");
  }
};

let KEYS = {
  "left": 37,
  "right": 39,
  "down": 40,
  "up": 38,
  "restart": 82
};

function setupKeyboardInput(inputter) {
  let keyState = {};

  window.addEventListener("keydown", e => {
    keyState[e.keyCode] = true;
  });

  window.addEventListener("keyup", e => {
    keyState[e.keyCode] = false;
  });

  setInterval(() => {
    Object.keys(KEYS)
      .filter(moveStr => {
        return keyState[KEYS[moveStr]];
      })
      .forEach(inputter);
  }, 100);
};

function setupGame() {
  let board = createBoard(ROWS, COLUMNS);
  setupKeyboardInput(inputter);

  function render() {
    drawBoard(screen, board, GRID_SIZE);
    let gameState = isGameWon(board) ?
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
      let moveVector = MOVES[moveStr];
      if (moveVector === undefined) {
        throw new Error("Move " + moveStr + " is invalid.");
      } else {
        move(board, moveVector);
      }
    }
  };

  return inputter;
};

let inputter = setupGame();