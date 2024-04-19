document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
  
    hamburger.addEventListener('click', function () {
        // Get the current value of the left property
        const currentLeft = parseFloat(getComputedStyle(sidebar).left);
    
        // Toggle the sidebar based on its current state
        if (currentLeft < 0) {
          sidebar.style.left = '0';
        } else {
          sidebar.style.left = '-100%';
        }
      });
    });

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
    let isGameActive = true;
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });
    
    function handleClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell'));
    
        if (cell.textContent !== '' || !isGameActive) return;
    
        placeMark(cell, currentPlayer);
        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && isGameActive) {
                setTimeout(() => {
                    makeAiMove();
                }, 500);
            }
        }
    }
    
    function evaluate(board) {
      // Check for winning combinations
      for (let i = 0; i < winningCombinations.length; i++) {
          const [a, b, c] = winningCombinations[i];
          if (board[a].textContent === board[b].textContent && board[a].textContent === board[c].textContent) {
              // If the AI wins, return a positive score
              if (board[a].textContent === 'O') {
                  return 10;
              }
              // If the user wins, return a negative score
              else if (board[a].textContent === 'X') {
                  return -10;
              }
          }
      }
  
      // Check for a draw
      if (isDraw()) {
          return 0;
      }
  
      // If the game is still ongoing, return null
      return null;
  }
  
    function placeMark(cell, player) {
        cell.textContent = player;
    }
    
    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    }
    
    function isDraw() {
        return [...cells].every(cell => {
            return cell.textContent !== '';
        });
    }
    
    function endGame(draw) {
        if (draw) {
            alert('It\'s a draw!');
        } else {
            alert(`${currentPlayer} wins!`);
        }
        isGameActive = false;
    }
    
    function makeAiMove() {
      let bestScore = -Infinity;
      let bestMove;
      for (let i = 0; i < cells.length; i++) {
          if (cells[i].textContent === '') {
              cells[i].textContent = currentPlayer;
              const score = minimax(cells, 0, -Infinity, Infinity, false);
              cells[i].textContent = '';
              if (score > bestScore) {
                  bestScore = score;
                  bestMove = i;
              }
          }
      }
      cells[bestMove].textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
          endGame(false);
      } else if (isDraw()) {
          endGame(true);
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
  }
  
  function minimax(board, depth, alpha, beta, isMaximizingPlayer) {
      const result = evaluate(board);
      if (result !== null) {
          return result;
      }
  
      if (isMaximizingPlayer) {
          let bestScore = -Infinity;
          for (let i = 0; i < board.length; i++) {
              if (board[i].textContent === '') {
                  board[i].textContent = 'O';
                  const score = minimax(board, depth + 1, alpha, beta, false);
                  board[i].textContent = '';
                  bestScore = Math.max(score, bestScore);
                  alpha = Math.max(alpha, score);
                  if (beta <= alpha) {
                      break;
                  }
              }
          }
          return bestScore;
      } else {
          let bestScore = Infinity;
          for (let i = 0; i < board.length; i++) {
              if (board[i].textContent === '') {
                  board[i].textContent = 'X';
                  const score = minimax(board, depth + 1, alpha, beta, true);
                  board[i].textContent = '';
                  bestScore = Math.min(score, bestScore);
                  beta = Math.min(beta, score);
                  if (beta <= alpha) {
                      break;
                  }
              }
          }
          return bestScore;
      }
  }
  