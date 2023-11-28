const BOARD_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';
let speed = INITIAL_SPEED;
let gameRunning = true;
let score = 0;

const gameBoard = document.getElementById('game-board');
const ctx = gameBoard.getContext('2d');
const restartButton = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');

gameBoard.width = BOARD_SIZE * CELL_SIZE;
gameBoard.height = BOARD_SIZE * CELL_SIZE;

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function update() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * BOARD_SIZE);
    food.y = Math.floor(Math.random() * BOARD_SIZE);
    speed -= 10;
    score += 10;
    updateScore();
  } else {
    snake.pop();
  }

  
  if (
    head.x < 0 || head.x >= BOARD_SIZE ||
    head.y < 0 || head.y >= BOARD_SIZE ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameRunning = false;
    restartButton.style.display = 'block';
  }
}

function render() {
  ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

  if (gameRunning) {
    drawSnake();
    drawFood();
    setTimeout(() => {
      update();
      render();
    }, speed);
  } else {
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', 130, 200);
  }
}

function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = 'right';
  speed = INITIAL_SPEED;
  gameRunning = true;
  score = 0;
  updateScore();
  restartButton.style.display = 'none';
  render();
}

restartButton.addEventListener('click', startGame);
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

startGame();