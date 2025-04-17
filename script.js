const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Load high score from localStorage or set to 0
let highScore = localStorage.getItem("simonHighScore") || 0;
document.getElementById("high-score").textContent = `High Score: ${highScore}`;

document.getElementById("start-btn").addEventListener("click", function () {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  const button = document.getElementById(randomChosenColor);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);

  playSound(randomChosenColor);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  const button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over! Tap Start to Retry";
    setTimeout(() => document.body.classList.remove("game-over"), 200);

    updateHighScore();
    startOver();
  }
}

function updateHighScore() {
  if (level - 1 > highScore) {
    highScore = level - 1;
    localStorage.setItem("simonHighScore", highScore);
    document.getElementById("high-score").textContent = `High Score: ${highScore}`;
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
