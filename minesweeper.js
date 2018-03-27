document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  boardEdge: 6,
  cells: [],
};

for (var i = 0; i < Math.pow(board.boardEdge,2); i++) {
  board.cells.push({
    row: Math.floor(i/board.boardEdge),
    col: i%board.boardEdge,
    // hidden: false,
    // isMine: false,
    // isMarked: false,
    // isProcessed: false,
    // surroundingMines: 0,
  });
}

resetBoard();

function startGame () {
  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    let currCell = board.cells[i]
    if (currCell.isMine && (!currCell.isMarked)) return;
    else if ((!currCell.isMine) && currCell.hidden) return;
    else if ((currCell.isMine) && (!currCell.hidden)) {
      
    }
  }


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win! Press any key to play again')
  document.addEventListener('keypress', restartGame);
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  return getSurroundingCells(cell.row, cell.col)
    .filter(function (cell) {
      return cell.isMine;
    })
    .length;
}

function resetBoard() {
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].isMine = (Math.random() > 0.8);
    board.cells[i].isMarked = false;
    board.cells[i].hidden = true;
    board.cells[i].isProcessed = false;
  }
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}

function restartGame(e) {
  document.getElementsByClassName('board')[0].innerHTML="";
  resetBoard();
  document.removeEventListener('keypress', restartGame);
  startGame();
}

