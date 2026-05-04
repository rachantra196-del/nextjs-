const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");

let score = 0;

function moveBox() {
  const gameArea = document.getElementById("game-area");

  const maxX = gameArea.clientWidth - box.clientWidth;
  const maxY = gameArea.clientHeight - box.clientHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

box.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveBox();
});

setInterval(moveBox, 1000);
moveBox();
