/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Marissa Bell
 * Date:11/17/24
 * Project for COSC 1350
 *
 */

// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Ball parameters
let ballRadius = 15, xPos = canvas.width / 2, yPos = canvas.height / 2;
let xMoveDist = 3, yMoveDist = 3;

//set dimensions of paddle
const paddleWidth = 100;
const paddleHeight = 15;

// Variables for paddle position and movement control
let xPaddle = (canvas.width - paddleWidth) /2; // sets the inital position of the paddle
let moveLeft = false; // Indicates if the left arrow key is pressed
let moveRight = false; // Indicates if the right arrow key is pressed

// Brick parameters
const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40;
const brickLeftOffset = 5;

let bricks = [];

// Function to initialize the bricks
function initializeBricks() {
  for (let c = 0; c < brickColumns; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRows; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1};
    }
  }
}

// Function to draw the bricks
function drawBricks() {
  for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
      if (bricks[c][r].status == 1) {//if the brick is visible
        let brickX =brickLeftOffset + (c * (brickWidth + brickPadding));
        let brickY = brickTopOffset + (r * (brickHeight + brickPadding));
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.fillStyle = "#0095DD"; //Brick color
        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
      }
    }
  }
}


//function that draws the ball inside the box
function ballRender() {
  ctx.beginPath();
  ctx.fillStyle = "Purple";
  //circular arc is created. It starts at 0, and ends at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

//Function to draw the paddle and set it's position
function paddle () {
  ctx.fillStyle ="black";
  ctx.fillRect (xPaddle, canvas.height - paddleHeight, paddleWidth, paddleHeight);

}

/*draw function executes where the ball is being drawn
in each frame of animation as it calls the ballRender function*/
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballRender();
  paddle();
  drawBricks();

  // Ball movement
  xPos += xMoveDist;
  yPos += yMoveDist;

  if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
    xMoveDist = -xMoveDist;
  }

  if (yPos < ballRadius) {
    yMoveDist = -yMoveDist;
  }
  
  if (yPos + ballRadius > canvas.height - paddleHeight) { // If ball is at the height of the paddle
    if (xPos > xPaddle && xPos < xPaddle + paddleWidth) { // If the ball is within the bounds of the paddle
      yMoveDist = -yMoveDist; // Bounce the ball upwards
    } else {
      // Game over, ball missed the paddle
      clearInterval(intervalID); // Stop the game loop
      document.body.innerHTML = "<h1>Game Over! You missed the paddle.</h1>";
    }
  }

  // Ball and brick collision detection
  for (let c = 0; c < brickColumns; c++) {
  for (let r = 0; r < brickRows; r++) {
    let brick = bricks[c][r];
    if (brick.status == 1 ) {
      if (xPos > brick.x && xPos < brick.x +brickWidth && yPos > brick.y && yPos < brick.y + brickHeight){
        yMoveDist = -yMoveDist;
        brick.status = 0;
      }
    }
  }
}

// Paddle movement based on pressing arrow keys
if (moveLeft && xPaddle > 0) { 
  xPaddle -= 5;
}
if (moveRight && xPaddle <canvas.width - paddleWidth){
  xPaddle += 5;
}
      
};

// returns an interval ID and determines how often to refresh the screen //
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);


function handleKeyDown (event){
  if (event.key === "ArrowLeft") {
    moveLeft = true;
  }
  if (event.key === "ArrowRight") {
    moveRight = true;
  }
}


function handleKeyUp (event){
  if (event.key === "ArrowLeft") {
    moveLeft = false;
  }
  if (event.key === "ArrowRight") {
    moveRight = false;
  }
}

initializeBricks();

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);