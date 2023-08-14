const gameBoard = document.querySelector("#gameboard");
const playerInfo = document.querySelector("#info");
const startAreas = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
playerInfo.textContent = "Circle Starts";
function createBoard() {
  startAreas.forEach((_el, i) => {
    const square = document.createElement("div");
    square.id = i;
    square.classList.add("square");
    square.addEventListener("click", addGo);

    gameBoard.append(square);
  });
}

createBoard();

function addGo(e) {
  console.log(e.target);
  const childDiv = document.createElement("div");
  e.target.removeEventListener("click", addGo);
  e.target.append(childDiv);
  childDiv.classList.add(go);
  go = go === "circle" ? "cross" : "circle";
  playerInfo.textContent = `let ${go}'s go`;

  checkForWin();
}

function checkForWin() {
  let allSquares = document.querySelectorAll(".square");
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
    allSquares[cell].firstChild?.classList.contains("circle"));
    if (circleWins) {
      playerInfo.textContent = "Circle Wins";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) => 
    allSquares[cell].firstChild?.classList.contains("cross"));
    if (crossWins) {
      playerInfo.textContent = "Cross Wins";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}
