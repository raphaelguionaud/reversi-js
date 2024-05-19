const Game = require("./index");

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test("Initialization", () => {
    expect(game.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    expect(game.currentPlayer).toBe(1);
  });

  test("Initialize Board with Custom Position", () => {
    const customPosition = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 2, 2, 0, 0, 0],
      [0, 0, 1, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    game.initializeBoardWithPosition(customPosition);
    expect(game.board).toEqual(customPosition);
  });

  test("Get Legal Moves", () => {
    const legalMoves = game.getLegalMoves();
    expect(legalMoves.length).toBeGreaterThan(0);
  });

  test("Make Move", () => {
    game.makeMove(2, 3);
    expect(game.board[2][3]).toBe(1); // Black piece
    expect(game.currentPlayer).toBe(2); // White's turn now
  });
});
