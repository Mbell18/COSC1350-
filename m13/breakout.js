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

canvas.tabIndex = 1;
canvas.focus(); 

canvas.addEventListener("click", () => canvas.focus());

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

// Variable for game score and timer
let score = 0;
let startTime = Date.now();
let elapsedTime = 0;

// A different color for each row of bricks
const brickColors = ["#FF5733", "#33FF57", "#3357FF","#FF33A1"]

// Different point values for each row
const rowPoints = [120, 60, 30, 15]

let gameOutcome = "";

// Function to initialize the bricks
function initializeBricks() {
  for (let c = 0; c < brickColumns; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRows; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1, color: brickColors[r], points: rowPoints[r] };
    }
  }
}

initializeBricks();

// Function to draw the bricks
function drawBricks() {
  for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
      if (bricks[c][r].status == 1) {//if the brick is visible
        let brickX = brickLeftOffset + (c * (brickWidth + brickPadding));
        let brickY = brickTopOffset + (r * (brickHeight + brickPadding));
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.fillStyle = bricks[c][r].color; //Brick color
        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);

        //Display points on the bricks
        ctx.fillStyle = "White";
        ctx.font = "15px Arial";
        ctx.fillText(bricks[c][r].points, brickX + brickWidth / 2 - 10, brickY + brickHeight / 2 + 5);
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

// Function to check that all bricks are cleared and determine if the player has won yet
function checkWinCondition(){
  for (let c = 0; c < brickColumns; c++) {
    for (let r = 0; r < brickRows; r++) {
      if (bricks[c][r].status == 1) {
        return false;
      }
    }
  }
  return true;
}

function showEndScreen() {
 // Hide game and show the final results
  document.getElementById("myCanvas").style.display = "none";
  document.getElementById("resetButton").style.display = "block";

  let minutes = Math.floor(elapsedTime / 60);
  let seconds = elapsedTime % 60;
  let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  const endScreen = document.getElementById("endScreen");
  if (gameOutcome === "win"){
    endScreen.innerHTML = `
      <h1>Congratulations, You Won!</h1>
      <p>Final score: ${score}</p>
      <p>Time: ${minutes}:${formattedSeconds}s</p>
    `;
  } else if (gameOutcome === "loss") {
  endScreen.innerHTML = `
      <h1>Game Over!</h1>
      <p>You let the ball go past the paddle.</p>
      <p>Final score: ${score}</p>
      <p>Time: ${minutes}:${formattedSeconds}s</p>
    `;

  }
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
      gameOutcome = "loss";
      showEndScreen();
      return;
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
        score += brick.points;
      }
    }
  }
}

// Paddle movement based on pressing arrow keys
if (moveLeft && xPaddle > 0) { 
  xPaddle -= 5;
}
if (moveRight && xPaddle < canvas.width - paddleWidth){
  xPaddle += 5;
}

if (checkWinCondition()) {
  clearInterval(intervalID); 
  gameOutcome = "win";
  showEndScreen();
  return;
}

 // Calculate time elapsed
 elapsedTime = Math.floor((Date.now() - startTime) / 1000);

 let minutes = Math.floor(elapsedTime / 60);
 let seconds = elapsedTime % 60;
 let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  // Present score and timer on the screen
  ctx.font = "22px Arial";
  ctx.fillStyle = "Black";
  ctx.fillText ("Score: " + score, 8, 20);
  ctx.fillText("Time: " + minutes + ":"+ formattedSeconds, canvas.width - 110, 20);
  
};

let refreshRate = 1000/30;

let intervalID = setInterval(draw, refreshRate);


canvas.addEventListener("keydown", handleKeyDown);
canvas.addEventListener("keyup", handleKeyUp);

function handleKeyDown (event){
  if (event.key === "ArrowLeft") {
    moveLeft = true;
    console.log("Left key pressed");
  }
  if (event.key === "ArrowRight") {
    moveRight = true;
    console.log("Right key pressed");
  }
}


function handleKeyUp (event){
  if (event.key === "ArrowLeft") {
    moveLeft = false;
    console.log("Left key released");
  }
  if (event.key === "ArrowRight") {
    moveRight = false;
    console.log("Right key released");
  }
}

function resetGame() {
  xPos = canvas.width / 2;
  yPos = canvas.height / 2;
  xMoveDist = 3;
  yMoveDist = 3;
  xPaddle = (canvas.width - paddleWidth) / 2;
  score = 0;
  startTime = Date.now();
  gameOutcome = "";

  initializeBricks();

  clearInterval(intervalID);
  intervalID = setInterval(draw, refreshRate);

  document.getElementById("myCanvas").style.display = "block";
  document.getElementById("resetButton").style.display = "none"
  document.getElementById("endScreen").innerHTML = "";

  moveLeft = false;
  moveRight = false;

  canvas.removeEventListener("keydown", handleKeyDown);
  canvas.removeEventListener("keyup", handleKeyUp);

  canvas.focus();
  canvas.addEventListener("keydown", handleKeyDown);
  canvas.addEventListener("keyup", handleKeyUp);

  console.log("Game reset and event listners attached");
  
}

document.getElementById("resetButton").addEventListener("click", resetGame);