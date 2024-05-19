const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

const NOT_STARTED = 0;
const IN_PROGRESS = 1;
const FINISHED = 2;

const defaultBoard = [
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, WHITE, BLACK, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, BLACK, WHITE, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];

class Game {
  /**
   * Initializes the Othello game board with the default starting position.
   * Black pieces are represented by 1, white pieces by 2, and empty cells by 0.
   */
  constructor() {
    this.initializeDefaultBoard();
    this.currentPlayer = BLACK;
    this.boardHistory = [];
    this.checkBoardState();
  }

  /**
   * Initializes the Othello game board with the default starting position.
   */
  initializeDefaultBoard() {
    this.board = defaultBoard;
  }

  /**
   * Initializes the Othello game board with a custom position.
   * @param {number[][]} position - The custom position to initialize the board with.
   * Black pieces are represented by 1, white pieces by 2, and empty cells by 0.
   * @throws {Error} Throws an error if the provided position is not an 8x8 array.
   */
  initializeBoardWithPosition(position) {
    if (position.length !== 8 || position.some((row) => row.length !== 8)) {
      throw new Error("Invalid position: Position must be an 8x8 array");
    }
    this.board = position;
    this.checkBoardState();
  }

  /**
   * Gets legal moves for the current player.
   * @returns {Array} An array of legal move coordinates in the form [row, col].
   */
  getLegalMoves() {
    const legalMoves = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.isValidMove(i, j)) {
          legalMoves.push([i, j]);
        }
      }
    }
    return legalMoves;
  }

  /**
   * Checks if a move is valid for the current player.
   * @param {number} row - The row index of the move.
   * @param {number} col - The column index of the move.
   * @returns {boolean} True if the move is valid, false otherwise.
   */
  isValidMove(row, col) {
    if (this.board[row][col] !== EMPTY) {
      return false; // Cell is not empty
    }
    // Check in all eight directions for valid moves
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let isValid = false;
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let foundOpponent = false;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (this.board[x][y] === EMPTY) {
          break;
        }
        if (this.board[x][y] !== this.currentPlayer) {
          foundOpponent = true;
        } else if (foundOpponent) {
          isValid = true;
          break;
        } else {
          break;
        }
        x += dx;
        y += dy;
      }
      if (isValid) {
        break;
      }
    }
    return isValid;
  }

  /**
   * Makes a move on the board for the current player.
   * @param {number} row - The row index of the move.
   * @param {number} col - The column index of the move.
   * @throws {Error} Throws an error if the move is not valid.
   */
  makeMove(row, col) {
    if (!this.isValidMove(row, col)) {
      throw new Error("Invalid move");
    }

    this.board[row][col] = this.currentPlayer;

    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let cellsToFlip = [];

      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (this.board[x][y] === EMPTY) {
          break;
        }
        if (this.board[x][y] !== this.currentPlayer) {
          cellsToFlip.push([x, y]);
        } else if (cellsToFlip.length > 0) {
          // Flip pieces between the new piece and the nearest piece of the same color
          for (const [flipX, flipY] of cellsToFlip) {
            this.board[flipX][flipY] = this.currentPlayer;
          }
          break;
        } else {
          break;
        }
        x += dx;
        y += dy;
      }
    }

    // Update board history
    this.boardHistory.push(this.board);

    // Update currentPlayer
    this.currentPlayer = this.currentPlayer === BLACK ? WHITE : BLACK;

    this.checkBoardState(true);

    // Update currentPlayer again if no legal moves available
    if (this.getLegalMoves().length === 0) {
      this.currentPlayer = this.currentPlayer === BLACK ? WHITE : BLACK;
    }
  }

  checkBoardState(onMove) {
    // Update score
    this.score = this.calculateScore();

    // Check if the board is full
    if (this.isBoardFull()) {
      this.state = FINISHED;

      // Decide winner
      if (this.score.black > this.score.white) {
        this.winner = BLACK;
      } else if (this.score.white > this.score.black) {
        this.winner = WHITE;
      } else {
        this.winner = EMPTY;
      }
    } else if (onMove) {
      // if after making a move then game is still ongoing
      this.state = IN_PROGRESS;
    } else {
      this.state = NOT_STARTED;
    }
  }

  /**
   * Checks if the game board is full.
   * @returns {boolean} True if the board is full, false otherwise.
   */
  isBoardFull() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j] === EMPTY) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Calculates the score of the game.
   * @returns {{ white: number, black: number }} An object containing the count of white and black pieces.
   */
  calculateScore() {
    let white,
      black = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j] === BLACK) {
          black++;
        } else if (this.board[i][j] === WHITE) {
          white++;
        }
      }
    }

    return {
      white: white,
      black: black,
    };
  }
}

module.exports = Game;
