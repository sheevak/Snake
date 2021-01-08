// This function creates rectangular components based on the width, height, colour
// and x and y coordinates passed to it.
function component (width, height, color, x, y) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// Generates the components which make up the snake
function refresh () {
  context.clearRect(0,0, 500, 500)
  snake.forEach(function(i){
    component( 10, 10, "red", i.x, i.y)
  });
}

// Generates a square food component at a random position
function randomFood () {
  // this do while condition ensures the food is not located within the body of the snake
  do {
    let foodx = Math.floor(Math.random() * 50) * 10;
    let foody = Math.floor(Math.random() * 50) * 10;
    food = {x: foodx, y: foody};
  } while (snake.some(i => i.x == food.x && i.y == food.y));

  component(10, 10, "yellow", food.x, food.y)
}

// changes direction of motion depending on key pressed
function direction (event) {
  const leftKey = 37;
  const rightKey = 39;
  const upKey = 38;
  const downKey = 40;

  const keyPressed = event.keyCode
   if (keyPressed === leftKey) {
     movex = -10;
     movey = 0;
   } else if (keyPressed === rightKey) {
     movex = 10;
     movey = 0;
   } else if (keyPressed === upKey) {
     movex = 0;
     movey = -10;
   } else if (keyPressed === downKey) {
     movex = 0;
     movey = 10;
   }
}

// Main function of game
function main () {
  front = {x:snake[0].x + movex, y:snake[0].y + movey}

  // This if statement controls what happens in each different scinarios
  if (front.x == food.x && front.y == food.y){
    // if eat food
    foodCounter += 1;
    console.log(foodCounter)
    snake.unshift(front);
    refresh();
    randomFood();
  } else if (front.x === -10 || front.x === 500 || front.y === -10 || front.y === 500) {
    // if hit walls
    console.log("Warning!!!");
  } else if (snake.some(i => i.x == front.x && i.y == front.y)) {
    // if hit snake
    console.log("hey");
  } else {
    // if doesn't hit anything
    snake.unshift(front);
    snake.pop();
    refresh();
    component(10, 10, "yellow", food.x, food.y);
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
let snake = [ {x:240, y:250}, {x:230, y:250}, {x:220, y:250}, {x:210, y:250}, {x:200, y:250}];

// declaring functions
let food;
let head;
let movex = 10;
let movey = 0;
let foodCounter = 0;

refresh();
randomFood();
window.setInterval(main, 200);
