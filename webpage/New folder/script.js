let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const boardElement = document.querySelector(".board");
const messageElement = document.getElementById("message");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");

function makeMove(index) {
    if (!gameOver && board[index] === "") {
        board[index] = currentPlayer;
        boardElement.children[index].innerText = currentPlayer;
        if (checkWin()) {
            gameOver = true;
            resultMessage.innerText = `Player ${currentPlayer} wins!`;
            resultScreen.classList.remove("hidden");
        } else if (board.every((cell) => cell !== "")) {
            gameOver = true;
            resultMessage.innerText = "It's a draw!";
            resultScreen.classList.remove("hidden");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageElement.innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    boardElement.childNodes.forEach((cell) => (cell.innerText = ""));
    gameOver = false;
    currentPlayer = "X";
    messageElement.innerText = "Player X's turn";
    resultScreen.classList.add("hidden");
}

function playAgain() {
    resetBoard();
    resultScreen.classList.add("hidden");
}

resetBoard();
