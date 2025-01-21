const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.querySelector('.winner-message');
const restartBtn = document.getElementById('restart-btn');

let isPlayerX = true; // X always starts
let board = Array(9).fill(null); // Initial empty board

// Winning combinations
const WINNING_COMBINATIONS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
];

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const currentPlayer = isPlayerX ? 'X' : 'O';
    const cellIndex = Array.from(cells).indexOf(cell);

    // Mark the cell
    if (!board[cellIndex]) {
        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken');
    }

    // Check for win or draw
    if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} wins!`);
    } else if (board.every((cell) => cell)) {
        endGame('Draw!');
    } else {
        isPlayerX = !isPlayerX; // Switch turns
    }
}

// Check for a win
function checkWin(player) {
    return WINNING_COMBINATIONS.some((combination) =>
        combination.every((index) => board[index] === player)
    );
}

// End the game
function endGame(message) {
    winnerMessage.textContent = message;
    cells.forEach((cell) => cell.removeEventListener('click', handleCellClick));
}

// Restart the game
function restartGame() {
    isPlayerX = true;
    board.fill(null);
    winnerMessage.textContent = '';
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('taken');
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

// Initialize game
cells.forEach((cell) =>
    cell.addEventListener('click', handleCellClick, { once: true })
);
restartBtn.addEventListener('click', restartGame);
