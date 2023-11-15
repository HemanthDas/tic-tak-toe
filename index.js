const cellElements = document.querySelectorAll("[data-cell]");
let playerOneTurn = true;
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
  console.log(currentClass);
}
