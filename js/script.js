const refs = {
  gameBoard: document.getElementById("gameBoard"),
  scoreDisplay: document.getElementById("score"),
  gameOverMessage: document.getElementById("gameOverMessage"),
  restartButton: document.getElementById("restartButton"),
  //   Controls for mobile
  upButton: document.querySelector(".up"),
  downButton: document.querySelector(".down"),
  leftButton: document.querySelector(".left"),
  rightButton: document.querySelector(".right"),
};

const width = 15; //The width of the playing field
let snake = [2, 1, 0]; //The initial location of the snake
let foodIndex = 0;
let direction = 1; // 1 - right, -1 - left, width - down, -width - up
let intervalTime = 500;
let speed = 0.9;
let score = 0;
let interval = 0;

function createGameBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    refs.gameBoard.appendChild(square);
  }
}

createGameBoard();

snake.forEach((index) => gameBoard.children[index].classList.add("snake"));

function startGame() {
  clearPrevGame();
  refs.scoreDisplay.textContent = `Score: ${score}`;
  direction = 1;
  generateFood();
  snake.forEach((index) => gameBoard.children[index].classList.add("snake"));
  interval = setInterval(move, intervalTime);
}

function clearPrevGame() {
  snake.forEach((index) => gameBoard.children[index].classList.remove("snake"));
  refs.gameBoard.children[foodIndex].classList.remove("food");
  clearInterval(interval);
  snake = [2, 1, 0];
  score = 0;
  intervalTime = 500;
  refs.gameOverMessage.style.display = "none";
  refs.restartButton.style.display = "none";
}

function move() {
  //checking the borders of the playing field or snake body
  if (
    (snake[0] + width >= width * width && direction === width) ||
    (snake[0] % width === width - 1 && direction === 1) ||
    (snake[0] % width === 0 && direction === -1) ||
    (snake[0] - width < 0 && direction === -width) ||
    gameBoard.children[snake[0] + direction].classList.contains("snake")
  ) {
    clearInterval(interval);
    gameOver();
    return;
  }

  //remove square from tail snake and add square on start
  const tail = snake.pop();
  refs.gameBoard.children[tail].classList.remove("snake");
  snake.unshift(snake[0] + direction);

  //check if snake eat food and add square to tail
  if (refs.gameBoard.children[snake[0]].classList.contains("food")) {
    refs.gameBoard.children[snake[0]].classList.remove("food");
    refs.gameBoard.children[tail].classList.add("snake");
    snake.push(tail);
    generateFood();

    //update score
    score++;
    refs.scoreDisplay.textContent = `Score: ${score}`;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(move, intervalTime);
  }

  gameBoard.children[snake[0]].classList.add("snake");
}

//Generate square in random position

function generateFood() {
  do {
    foodIndex = Math.floor(Math.random() * (width * width));
  } while (gameBoard.children[foodIndex].classList.contains("snake"));
  refs.gameBoard.children[foodIndex].classList.add("food");
}

document.addEventListener("keydown", control);

function control(e) {
  switch (e.keyCode) {
    case 39:
      direction = 1; //right
      break;
    case 38:
      direction = -width; //up
      break;
    case 37:
      direction = -1; //left
      break;
    case 40:
      direction = +width; //down
      break;
    default:
      break;
  }
}

function gameOver() {
  refs.gameOverMessage.textContent = `Game Over! Your score is: ${score}`;
  refs.gameOverMessage.style.display = "block";
  refs.restartButton.style.display = "block";
}

refs.restartButton.addEventListener("click", startGame);

startGame();

// for Mobile

refs.upButton.addEventListener("click", () => {
  if (direction !== width) {
    direction = -width; // up
  }
});

refs.downButton.addEventListener("click", () => {
  if (direction !== -width) {
    direction = width; // down
  }
});

refs.leftButton.addEventListener("click", () => {
  if (direction !== 1) {
    direction = -1; // left
  }
});

refs.rightButton.addEventListener("click", () => {
  if (direction !== -1) {
    direction = 1; // right
  }
});
