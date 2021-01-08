// This function creates rectangular components based on the width, height, colour
// and x and y coordinates passed to it.
function component (width, height, color, x, y) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// Generates the components which make up the snake
function snakeGen () {
  context.clearRect(0,0, 500, 500)
  snake.forEach(function(i){
    component( 20, 20, "red", i.x, i.y);
  });
}

// Generates a square food component at a random position
function foodGen () {
  // this do while condition ensures the food is not located within the body of the snake
  do {
    let foodx = Math.floor(Math.random() * 25) * 20;
    let foody = Math.floor(Math.random() * 25) * 20;
    food = {x: foodx, y: foody};
  } while (snake.some(i => i.x == food.x && i.y == food.y));

  component(20, 20, "yellow", food.x, food.y);
}

// changes direction of motion depending on key pressed
function direction (event) {
  const leftKey = 37;
  const rightKey = 39;
  const upKey = 38;
  const downKey = 40;

  const keyPressed = event.keyCode;
   if (keyPressed === leftKey && movement !== "right") {
     movement = "left";
     movex = -20;
     movey = 0;
   } else if (keyPressed === rightKey && movement !== "left") {
     movement = "right"
     movex = 20;
     movey = 0;
   } else if (keyPressed === upKey && movement !== "down") {
     movement = "up"
     movex = 0;
     movey = -20;
   } else if (keyPressed === downKey && movement !== "up") {
     movement = "down"
     movex = 0;
     movey = 20;
   }
}

// Main function which runs the game
function main () {
  front = {x:snake[0].x + movex, y:snake[0].y + movey}

  // This if statement controls what happens in each different scenario
  if (front.x == food.x && front.y == food.y){
    // if eat food lengthen snake by 1
    foodCounter += 1;
    console.log(foodCounter)
    snake.unshift(front);
    snakeGen();
    foodGen();
  } else if (front.x === -20 || front.x === 500 || front.y === -20 || front.y === 500 || snake.some(i => i.x == front.x && i.y == front.y)) {
    // if hit walls or snake end game
    console.log("Warning!!!");
    clearInterval(runGame);
  } else {
    // if doesn't hit anything continue as normal
    snake.unshift(front);
    snake.pop();
    snakeGen();
    component(20, 20, "yellow", food.x, food.y);
  }
}

// Creating the canvas element
const gameArea = document.createElement("canvas");
gameArea.width = 500;
gameArea.height = 500;
gameArea.style.background = "black";
let context = gameArea.getContext("2d");
document.body.insertBefore(gameArea, document.body.childNodes[0]);
document.addEventListener("keydown", direction)

// Creating the initial snake
let snake = [ {x:240, y:240}, {x:230, y:240}, {x:220, y:240}, {x:210, y:240}, {x:200, y:240}];

// declaring variables
let food;
let head;
let movex = 20;
let movey = 0;
let foodCounter = 0;
let movement = "right";

snakeGen();
foodGen();
const runGame = window.setInterval(main, 200);
