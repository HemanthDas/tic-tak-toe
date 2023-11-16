const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("teller");
const declare = document.getElementById("winner");
const panel1 = document.getElementById("one");
const panel2 = document.getElementById("two");
const grid = document.getElementById("grid");
const playerName = document.querySelectorAll("label");
let playerOneTurn = true;
const winningCombos = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
function start() {
  let playerOne = document.getElementById("player1").value;
  let playerTwo = document.getElementById("player2").value;
  if (playerOne == "") {
    playerOne = "Player 1";
  }
  if (playerTwo == "") {
    playerTwo = "Player 2";
  }
  playerName[0].innerHTML = playerOne;
  playerName[1].innerHTML = playerTwo;
  grid.classList.remove("blur");
  board.classList.add("hide");
}
function restart() {
  cellElements.forEach((cell) => {
    cell.classList.remove("circle");
    cell.classList.remove("cross");
  });
  panel1.classList.remove("no-show");
  panel2.classList.add("no-show");
  board.classList.remove("no-hide");
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: false });
  });
  playerOneTurn = true;
  playerName[1].classList.remove("active");
  playerName[0].classList.add("active");
}
cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});
function handleClick(e) {
  const cell = e.target;
  const currentClass = playerOneTurn ? "cross" : "circle";
  placeMark(cell, currentClass);
  checkWin(currentClass);
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  playerOneTurn = !playerOneTurn;
}
function checkWin(currentClass) {
  const hasWinner = winningCombos.some((combo) => {
    return (
      cellElements[combo[0]].classList.contains(currentClass) &&
      cellElements[combo[1]].classList.contains(currentClass) &&
      cellElements[combo[2]].classList.contains(currentClass)
    );
  });

  if (hasWinner) {
    change(currentClass == "cross" ? "Player 1 Wins" : "Player 2 Wins");
    return;
  }

  let count = 0;

  for (const cell of cellElements) {
    if (cell.classList.contains("cross") || cell.classList.contains("circle")) {
      count++;
    }
  }

  if (count === 9) {
    change("Draw");
    return;
  }

  if (!playerOneTurn) {
    playerName[0].classList.remove("active");
    playerName[1].classList.add("active");
  } else {
    playerName[1].classList.remove("active");
    playerName[0].classList.add("active");
  }
}
function change(message) {
  declare.innerHTML = message;
  panel1.classList.add("no-show");
  panel2.classList.remove("no-show");
  board.classList.remove("hide");
  board.classList.add("no-hide");
  grid.classList.add("blur");
}
