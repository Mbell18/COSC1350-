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

//To draw a ball use x position, y postion and radius
let ballRadius = 15, xPos = canvas.width / 2, yPos = canvas.height / 2;

//xy values used to move the ball around the screen
let xMoveDist = 3, yMoveDist = 3;

//set dimensions of paddle
const paddleWidth = 100;
const paddleHeight = 15;

// Variables for paddle position and movement control
let xPaddle = (canvas.width - paddleWidth) /2; // sets the inital position of the paddle
let moveLeft = false; // Indicates if the left arrow key is pressed
let moveRight = false; // Indicates if the right arrow key is pressed

//function that draws the ball inside the box
ballRender=()=>{
  ctx.beginPath();
  ctx.fillStyle = "Purple";
  //circular arc is created. It starts at 0, and ends at 2pi (360 degrees)
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  //default color is used for the fill of the circular path
  ctx.fill();
  ctx.closePath();
}


/*draw function executes where the ball is being drawn
in each frame of animation as it calls the ballRender function*/
draw=()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballRender();
  paddle();
  /* x and y positions will send the ball flying
  now that the xMoveDist and yMoveDist is included*/
  xPos += xMoveDist;
  yPos += yMoveDist;

  if (xPos > canvas.width - ballRadius || xPos < ballRadius) {
    xMoveDist = -xMoveDist;
  }

  if (yPos > canvas.height - ballRadius || yPos < ballRadius) {
    yMoveDist = -yMoveDist;
  }
  if (moveLeft && xPaddle > 0) {
    xPaddle -= 3;
  }
  if (moveRight && xPaddle < canvas.width - paddleWidth) {
    xPaddle += 3;
  }

};


// returns an interval ID and determines how often to refresh the screen //
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);


//Function to draw the paddle and set it's position
function paddle () {
  ctx.fillStyle ="black";
  ctx.fillRect (xPaddle, canvas.height - paddleHeight, paddleWidth, paddleHeight);

}


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

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);