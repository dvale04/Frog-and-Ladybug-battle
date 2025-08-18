playerLadybug = "R";
var playerFrog = "G";
var currPlayer = playerLadybug;

var gameOver = false; //on and off button. when we get winner, game is off/true.
//when we start game, game is on and tiles are clickable/false/game is not over .  
var board;

var rows = 15;
var columns = 15;
var selectedOpponent;


window.onload = function() {
    setGame();
}

function setGame() {
    board = [];

    for (let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < columns; c++){
            //JS
            row.push(' ');

            //HTML
            //<div id="0-0" class="tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}
function setPiece(){ 
    if(gameOver){
        return; // if game over is still false, keep going and setting 
        //pieces 
    }
    let coords = this.id.split("-"); //"0-0" -> ["0","0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if(board[r][c] !== ' ') {
        return;  //to not be able to click a tile twice

    }

    board[r][c] = currPlayer; 
    let tile = this; 
    if (currPlayer == playerLadybug) {
        tile.classList.add("ladybug-piece");
    }
    else {
        tile.classList.add("frog-piece");
    
    }
    currPlayer = (currPlayer === playerLadybug) ? playerFrog : playerLadybug;

    checkWinner();
    if (currPlayer === playerFrog && !gameOver ) { 
        computerMove();
    }
   
}

function computerMove(){
    if(gameOver || selectedOpponent !== "Computer" ) {
        return; // If the game is over, no need to make a move
    }
    function findEmptyTilesNextToFrog() {
        let emptyTilesNextToFrog = [];
        for (let r = 0; r < rows; r++) {
            let frogCol = -1; // Initialize frog column for the current row
            for (let c = 0; c < columns; c++) {
                if (board[r][c] === playerFrog) {
                    frogCol = c; // Update frog column if a frog is found
                    break;
                }
            }
     // If a frog is found in the row
     if (frogCol !== -1) {
        // Check adjacent tiles only in the same row as the frog
        if (frogCol > 0 && board[r][frogCol - 1] === ' ') {
            emptyTilesNextToFrog.push({ row: r, col: frogCol - 1 });
        }
        if (frogCol < columns - 1 && board[r][frogCol + 1] === ' ') {
            emptyTilesNextToFrog.push({ row: r, col: frogCol + 1 });
        }
    }
}
return emptyTilesNextToFrog;
}

    
    function hasPotentialWin(player) { //strategy 

        // Check horizontally
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] === player &&
                    board[r][c + 1] === player &&
                    board[r][c + 2] === player &&
                    board[r][c + 3] === ' ') {
                    return { row: r, col: c + 3 };
                }
            }
        }
        // Check vertically
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c] === player &&
                    board[r + 1][c] === player &&
                    board[r + 2][c] === player &&
                    board[r + 3][c] === ' ') {
                    return { row: r + 3, col: c };
                }
            }
        }
        // Check diagonally (top-left to bottom-right)
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] === player &&
                    board[r + 1][c + 1] === player &&
                    board[r + 2][c + 2] === player &&
                    board[r + 3][c + 3] === ' ') {
                    return { row: r + 3, col: c + 3 };
                }
            }
        }
        // Check diagonally (bottom-left to top-right)
        for (let r = 3; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] === player &&
                    board[r - 1][c + 1] === player &&
                    board[r - 2][c + 2] === player &&
                    board[r - 3][c + 3] === ' ') {
                    return { row: r - 3, col: c + 3 };
                }
            }
        }
        // Check horizontally 
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 4; c++) {
                if (board[r][c] === player &&
                    board[r][c + 1] === player &&
                    board[r][c + 2] === player &&
                    board[r][c + 3] === player &&
                    board[r][c + 4] === ' ') {
                    return { row: r, col: c + 4 };
                }
            }
        }
        // Check vertically
        for (let r = 0; r < rows - 4; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c] === player &&
                    board[r + 1][c] === player &&
                    board[r + 2][c] === player &&
                    board[r + 3][c] === player &&
                    board[r + 4][c] === ' ') {
                    return { row: r + 4, col: c };
                }
            }
        }
        // Check diagonally
        for (let r = 0; r < rows - 4; r++) {
            for (let c = 0; c < columns - 4; c++) {
                if (board[r][c] === player &&
                    board[r + 1][c + 1] === player &&
                    board[r + 2][c + 2] === player &&
                    board[r + 3][c + 3] === player &&
                    board[r + 4][c + 4] === ' ') {
                    return { row: r + 4, col: c + 4 };
                }
            }
        }
        for (let r = 4; r < rows; r++) {
            for (let c = 0; c < columns - 4; c++) {
                if (board[r][c] === player &&
                    board[r - 1][c + 1] === player &&
                    board[r - 2][c + 2] === player &&
                    board[r - 3][c + 3] === player &&
                    board[r - 4][c + 4] === ' ') {
                    return { row: r - 4, col: c + 4 };
                }
            }
        }
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                // Check horizontally for 4 in a row
                if (c <= columns - 4 && board[r][c] === player && board[r][c + 1] === player &&
                    board[r][c + 2] === player && board[r][c + 3] === player) {
                    if (c < columns - 4 && board[r][c + 4] === ' ') {
                        return { row: r, col: c + 4 }; // Block the 4 in a row
                    }
                }
                // Check vertically for 4 in a row
                if (r <= rows - 4 && board[r][c] === player && board[r + 1][c] === player &&
                    board[r + 2][c] === player && board[r + 3][c] === player) {
                    if (r > 0 && board[r - 1][c] === ' ') {
                        return { row: r - 1, col: c }; // Block the 4 in a row
                    }
                    else if (r + 4 < rows && board[r + 4][c] === ' ') {
                        return { row: r + 4, col: c }; // Block the 4 in a row
                    }
                }
                // Check diagonally from bottom-left to top-right for 4 in a row
if (r >= 3 && c <= columns - 4 && board[r][c] === player &&
    board[r - 1][c + 1] === player && board[r - 2][c + 2] === player &&
    board[r - 3][c + 3] === player) {
    // Check if there's an empty space to the top-right of the sequence
    if (r - 4 >= 0 && c + 4 < columns && board[r - 4][c + 4] === ' ') {
        return { row: r - 4, col: c + 4 }; // Block the 4 in a row
    }
    // Check if there's an empty space to the bottom-left of the sequence
    if (r + 1 < rows && c - 1 >= 0 && board[r + 1][c - 1] === ' ') {
        return { row: r + 1, col: c - 1 }; // Block the 4 in a row
    }
}

                // Check diagonally from top-left to bottom-right for 4 in a row
                if (r <= rows - 4 && c <= columns - 4 && board[r][c] === player &&
                    board[r + 1][c + 1] === player && board[r + 2][c + 2] === player &&
                    board[r + 3][c + 3] === player) {
                    if (r > 0 && c > 0 && board[r - 1][c - 1] === ' ') {
                        return { row: r - 1, col: c - 1 }; // Block the 4 in a row
                    }
                    else if (r + 4 < rows && c + 4 < columns && board[r + 4][c + 4] === ' ') {
                        return { row: r + 4, col: c + 4 }; // Block the 4 in a row
                    }
                }
                //Check horizontally for 3 in a row 
                if (c <= columns - 3 && board[r][c] === player && board[r][c + 1] === player &&
                    board[r][c + 2] === player) {
                    if (c < columns - 3 && board[r][c + 3] === ' ') {
                        return { row: r, col: c + 3 }; // Block the 3 in a row
                    }
                }
                // Check vertically for 3 in a row
                if (r <= rows - 3 && board[r][c] === player && board[r + 1][c] === player &&
                    board[r + 2][c] === player) {
                    if (r > 0 && board[r - 1][c] === ' ') {
                        return { row: r - 1, col: c }; // Block the 3 in a row
                    }
                    else if (r + 3 < rows && board[r + 3][c] === ' ') {
                        return { row: r + 3, col: c }; // Block the 3 in a row
                    }
                }
                // Check diagonally from bottom-left to top-right for 3 in a row
                if (r >= 2 && c <= columns - 3 && board[r][c] === player &&
                    board[r - 1][c + 1] === player && board[r - 2][c + 2] === player) {
                    if (r + 1 < rows && c > 0 && board[r + 1][c - 1] === ' ') {
                        return { row: r + 1, col: c - 1 }; // Block the 3 in a row
                    }
                    else if (r - 3 >= 0 && c + 3 < columns && board[r - 3][c + 3] === ' ') {
                        return { row: r - 3, col: c + 3 }; // Block the 3 in a row
                    }
                }
                // Check diagonally from top-left to bottom-right for 3 in a row
                if (r <= rows - 3 && c <= columns - 3 && board[r][c] === player &&
                    board[r + 1][c + 1] === player && board[r + 2][c + 2] === player) {
                    if (r > 0 && c > 0 && board[r - 1][c - 1] === ' ') {
                        return { row: r - 1, col: c - 1 }; // Block the 3 in a row
                    }
                    else if (r + 3 < rows && c + 3 < columns && board[r + 3][c + 3] === ' ') {
                        return { row: r + 3, col: c + 3 }; // Block the 3 in a row
                    }
                }
                // Check horizontally for 2 in a row
if (c <= columns - 2 && board[r][c] === player && board[r][c + 1] === player) {
    // Check if there's an empty space to the right of the 2 in a row
    if (c < columns - 2 && board[r][c + 2] === ' ') {
        return { row: r, col: c + 2 }; // Block the 2 in a row
    }
    // Check if there's an empty space to the left of the 2 in a row
    if (c > 0 && board[r][c - 1] === ' ') {
        return { row: r, col: c - 1 }; // Block the 2 in a row
    }
}
}
        }
        // No potential win or blockable move found
        return null;
    }


    // Check if opponent is about to win and block them
    let opponentWinMove = hasPotentialWin(currPlayer === playerLadybug ? playerFrog : playerLadybug);
    if (opponentWinMove) {
        // Place the computer's piece to block the opponent
        let r = opponentWinMove.row;
        let c = opponentWinMove.col;
        board[r][c] = currPlayer;
        let tileId = r.toString() + "-" + c.toString();
        let tile = document.getElementById(tileId);
        tile.classList.add(currPlayer === playerLadybug ? "ladybug-piece" : "frog-piece");
        currPlayer = (currPlayer === playerLadybug) ? playerFrog : playerLadybug;
        checkWinner();
        return;
    }

     let emptyTilesNextToFrog = findEmptyTilesNextToFrog();

    // If there are empty tiles next to frog pieces, prioritize placing the computer's piece there
    if (emptyTilesNextToFrog.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyTilesNextToFrog.length);
        let randomTile = emptyTilesNextToFrog[randomIndex];
        let r = randomTile.row;
        let c = randomTile.col;

        // Place the computer's piece on the selected tile
        board[r][c] = currPlayer;
        let tileId = r.toString() + "-" + c.toString();
        let tile = document.getElementById(tileId);
        tile.classList.add(currPlayer === playerLadybug ? "ladybug-piece" : "frog-piece");

        // Switch the current player
        currPlayer = (currPlayer === playerLadybug) ? playerFrog : playerLadybug;

        // Check for a winner after the computer moves
        checkWinner();
        return;
    }


    // Find an empty tile to place the computer's piece
    let emptyTiles = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === ' ') {
                emptyTiles.push({ row: r, col: c });
            }
        }
    }

    // Randomly select an empty tile to place the computer's piece
    if (emptyTiles.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyTiles.length);
        let randomTile = emptyTiles[randomIndex];
        let r = randomTile.row;
        let c = randomTile.col;

        // Place the computer's piece on the selected tile
        board[r][c] = currPlayer;
        let tileId = r.toString() + "-" + c.toString();
        let tile = document.getElementById(tileId);
        tile.classList.add(currPlayer === playerLadybug ? "ladybug-piece" : "frog-piece");

        // Switch the current player
        currPlayer = (currPlayer === playerLadybug) ? playerFrog : playerLadybug;

        // Check for a winner after the computer moves
        checkWinner();
    }
}




function checkWinner(){
    //horizontally 
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < 11; c++){
            if (board[r][c] != ' '){
            
            if (board[r][c] === board[r][c + 1] &&
                board[r][c + 1] === board[r][c + 2] &&
                board[r][c + 2] === board[r][c + 3] &&
                board[r][c + 3] === board[r][c + 4]) {
                for (let i = 0; i < 5; i++) {
                        setWinner(r, c + i);
                }
                return; 
        }
            }

}
    //vertically
    for (let r = 0; r < 11; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] === board[r + 1][c] &&
                    board[r + 1][c] === board[r + 2][c] &&
                    board[r + 2][c] === board[r + 3][c] &&
                    board[r + 3][c] === board[r + 4][c]) {
                    for (let i = 0; i < 5; i++) {
                        setWinner(r + i, c);
                    }
                    return;
                }
            }
        }
    }
// anti diagonal
for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 4; c++) {
        if (board[r][c] != ' ') {
            if (board[r][c] === board[r - 1][c + 1] &&
                board[r - 1][c + 1] === board[r - 2][c + 2] &&
                board[r - 2][c + 2] === board[r - 3][c + 3] &&
                board[r - 3][c + 3] === board[r - 4][c + 4]) {
                for (let i = 0; i < 5; i++) {
                    setWinner(r - i, c + i);
                }
                return;
            }
        }
    }
}
    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 3; c < columns; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] === board[r - 1][c - 1] &&
                    board[r - 1][c - 1] === board[r - 2][c - 2] &&
                    board[r - 2][c - 2] === board[r - 3][c - 3] &&
                    board[r - 3][c - 3] === board[r - 4][c - 4]) {
                    for (let i = 0; i < 5; i++) {
                        setWinner(r - i, c - i);
                    }
                    return;
                }
            }
        }
    }

function setWinner(r, c)
{
    let winner = document.getElementById("winner");
    if (board[r][c] == playerLadybug){
        winner.innerText = "Ladybug Wins";
    } else {
        winner.innerText = "Frog Wins";
    }
    gameOver = true; //true game is over so not able to paint tiles 
    // the function immediately returns without allowing further moves. 
}

document.getElementById("opponent1").addEventListener("click", function() {
    selectedOpponent = "Human";
    startNewGame();
});
document.getElementById("opponent2").addEventListener("click", function() {
    selectedOpponent = "Computer";
    startNewGame();
});
document.getElementById("Start").addEventListener("click", function(){
    startNewGame("Start");
});

function startNewGame() {
        resetBoard();
        gameOver = false; //able to paint tiles again 
        currPlayer = playerLadybug;
        let winner = document.getElementById("winner");
        winner.innerText = "";
}
    

function resetBoard(){
    board = []; 

    let tiles = document.getElementsByClassName("tile");
    for (let tile of tiles){
        tile.classList.remove("ladybug-piece", "frog-piece");
  }
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
        row.push(' ');
    }
    board.push(row);
}
}
// JavaScript to change the gradient based on scroll position

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollBottom = scrollTop + windowHeight;

    // Change background gradient based on scroll position
    if (scrollTop + windowHeight >= docHeight + 100) {
        // If scrolled past the bottom + 100px
        document.body.style.background = 'linear-gradient(to top,rgb(255, 255, 255),rgb(255, 255, 255))';
    } else {
        // Default gradient background
        document.body.style.background = 'linear-gradient(to bottom,rgb(255, 255, 255),rgb(255, 255, 255))';
    }
});

// Optional: Adjust initial gradient in case of direct page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.background = 'linear-gradient(to bottom,rgb(255, 255, 255),rgb(255, 255, 255))';
});


}
    }