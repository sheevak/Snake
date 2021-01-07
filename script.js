// This function creates rectangular components based on the width, height, colour
// and x and y coordinates passed to it.
function component(width, height, color, x, y) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// Generates the components which make up the snake
function refresh(){
  context.clearRect(0,0, 500, 500)
  snake.forEach(function(i){
    component( 10, 10, "red", i.x, i.y)
  });
}

// Creating the canvas element
let gameArea = document.createElement("canvas");
gameArea.width = 500;
gameArea.height = 500;
gameArea.style.background = "black";
let context = gameArea.getContext("2d");
document.body.insertBefore(gameArea, document.body.childNodes[0]);

// Creating the initial snake
let snake = [ {x:200, y:250}, {x:210, y:250}, {x:220, y:250}, {x:230, y:250}, {x:240, y:250}];

refresh()
