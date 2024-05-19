/**
 * Represents a Reversi/Othello game engine.
 */
declare class Game {
  /**
   * Represents the game board for Othello.
   * Each cell of the board is represented by a number:
   * - 0: Empty cell
   * - 1: Black piece
   * - 2: White piece
   */
  readonly board: number[][];

  /**
   * Represents the current player's turn.
   * - 1: Black player's turn
   * - 2: White player's turn
   */
  readonly currentPlayer: number;

  /**
   * Represents the winner of the game.
   * - 0: Draw
   * - 1: Black player wins
   * - 2: White player wins
   */
  readonly winner: number;

  /**
   * The score of the game, counting the number of white and black pieces.
   */
  readonly score: { white: number; black: number };

  /**
   * Creates a new instance of the Othello game engine.
   */
  constructor();

  /**
   * Initializes the Othello game board with a custom position.
   * @param position The custom position to initialize the board with.
   *                Black pieces are represented by 1, white pieces by 2, and empty cells by 0.
   * @throws Throws an error if the provided position is not an 8x8 array.
   */
  initializeBoardWithPosition(position: number[][]): void;

  /**
   * Gets legal moves for the current player.
   * @returns An array of legal move coordinates in the form [row, col].
   */
  getLegalMoves(): [number, number][];

  /**
   * Checks if a move is valid for the current player.
   * @param row The row index of the move.
   * @param col The column index of the move.
   * @returns True if the move is valid, false otherwise.
   */
  isValidMove(row: number, col: number): boolean;

  /**
   * Makes a move on the board for the current player.
   * @param row The row index of the move.
   * @param col The column index of the move.
   * @throws Throws an error if the move is not valid.
   */
  makeMove(row: number, col: number): void;

  /**
   * Checks if the game board is full.
   * @returns {boolean} True if the board is full, false otherwise.
   */
  isBoardFull(): boolean;

  /**
   * Calculates the score of the game.
   * @returns {{ white: number, black: number }} An object containing the count of white and black pieces.
   */
  calculateScore(): { white: number; black: number };
}

export = Game;
