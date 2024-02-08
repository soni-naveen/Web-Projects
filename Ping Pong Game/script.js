// Initialize canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let restartBtn = document.getElementById("restart-btn");
let animationId;
let gameRunning = false;

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (!gameRunning) {
      // only start the game if gameRunning is false
      gameRunning = true; // set gameRunning to true when the game starts
      loop();
    }
  }
});
startBtn.addEventListener("click", function () {
  if (!gameRunning) {
    // only start the game if gameRunning is false
    gameRunning = true; // set gameRunning to true when the game starts
    loop();
  }
});

pauseBtn.addEventListener("click", function () {
  gameRunning = false;
  cancelAnimationFrame(animationId);
});

restartBtn.addEventListener("click", function () {
  document.location.reload();
});

addEventListener("load", (event) => {
  draw();
});

// Define ball properties
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 6;
let ballSpeedY = 6;

// Define paddle properties
let paddleHeight = 80;
let paddleWidth = 10;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let paddleSpeed = 10;

// Define score properties
let leftPlayerScore = 0;
let rightPlayerScore = 0;
let maxScore = 10;

// Listen for keyboard events
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Handle key press
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

function keyDownHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "ArrowDown") {
    downPressed = true;
  } else if (e.key === "w") {
    wPressed = true;
  } else if (e.key === "s") {
    sPressed = true;
  }
}

// Handle key release
function keyUpHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = false;
  } else if (e.key === "ArrowDown") {
    downPressed = false;
  } else if (e.key === "w") {
    wPressed = false;
  } else if (e.key === "s") {
    sPressed = false;
  }
}

// Update game state
function update() {
  // Move paddles
  if (upPressed && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  } else if (downPressed && rightPaddleY + paddleHeight < canvas.height) {
    rightPaddleY += paddleSpeed;
  }

  // Move right paddle based on "w" and "s" keys
  if (wPressed && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  } else if (sPressed && leftPaddleY + paddleHeight < canvas.height) {
    leftPaddleY += paddleSpeed;
  }

  // // Move left paddle automatically based on ball position
  // if (ballY > leftPaddleY + paddleHeight / 2) {
  //   leftPaddleY += paddleSpeed;
  // } else if (ballY < leftPaddleY + paddleHeight / 2) {
  //   leftPaddleY -= paddleSpeed;
  // }

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check if ball collides with top or bottom of canvas
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check if ball collides with left paddle
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check if ball collides with right paddle
  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX < 0) {
    rightPlayerScore++;
    reset();
  } else if (ballX > canvas.width) {
    leftPlayerScore++;
    reset();
  }

  // Check if a player has won
  if (leftPlayerScore === maxScore) {
    playerWin("Left player");
  } else if (rightPlayerScore === maxScore) {
    playerWin("Right player");
  }
}

function playerWin(player) {
  let message = player + " win!";
  $("#message").text(message); // Set the message text
  $("#message-modal").modal("show"); // Display the message modal
  reset();
}

// Reset ball to center of screen
function reset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.random() * 10 - 5;
}

// Draw objects on canvas
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#84fc03";
  ctx.font = "17px Arial";

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "#fff"; // Set line color to white
  ctx.stroke();
  ctx.closePath();

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  // Draw left paddle
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

  // Draw right paddle
  ctx.fillRect(
    canvas.width - paddleWidth,
    rightPaddleY,
    paddleWidth,
    paddleHeight
  );

  // Draw scores
  ctx.fillText("Score: " + leftPlayerScore, 10, 20);
  ctx.fillText("Score: " + rightPlayerScore, canvas.width - 70, 20);
}

// Game loop
function loop() {
  update();
  draw();
  animationId = requestAnimationFrame(loop);
}

$("#message-modal-close").on("click", function () {
  document.location.reload();
});
