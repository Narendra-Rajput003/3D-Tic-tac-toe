type Player = "sphere" | "cube" | null;
type Board = Player[][];

interface Move {
  row: number;
  col: number;
  score: number;
}

export class AIPlayer {
  private aiPlayer: Player;
  private humanPlayer: Player;

  constructor(aiPlayer: Player, humanPlayer: Player) {
    this.aiPlayer = aiPlayer;
    this.humanPlayer = humanPlayer;
  }

  // Get the best move for the AI
  getBestMove(board: Board, difficulty: "easy" | "medium" | "hard" = "medium"): { row: number; col: number } | null {
    const emptySpots = this.getEmptySpots(board);
    
    if (emptySpots.length === 0) return null;

    // Easy mode: Random move
    if (difficulty === "easy") {
      return this.getRandomMove(emptySpots);
    }

    // Medium mode: 70% smart, 30% random
    if (difficulty === "medium" && Math.random() < 0.3) {
      return this.getRandomMove(emptySpots);
    }

    // Hard mode or medium mode smart move: Use minimax
    return this.minimaxMove(board);
  }

  private getRandomMove(emptySpots: { row: number; col: number }[]): { row: number; col: number } {
    const randomIndex = Math.floor(Math.random() * emptySpots.length);
    return emptySpots[randomIndex];
  }

  private minimaxMove(board: Board): { row: number; col: number } {
    let bestScore = -Infinity;
    let bestMove: { row: number; col: number } = { row: 0, col: 0 };

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          board[row][col] = this.aiPlayer;
          const score = this.minimax(board, 0, false);
          board[row][col] = null;

          if (score > bestScore) {
            bestScore = score;
            bestMove = { row, col };
          }
        }
      }
    }

    return bestMove;
  }

  private minimax(board: Board, depth: number, isMaximizing: boolean): number {
    const winner = this.checkWinner(board);
    
    if (winner === this.aiPlayer) return 10 - depth;
    if (winner === this.humanPlayer) return depth - 10;
    if (this.isBoardFull(board)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            board[row][col] = this.aiPlayer;
            const score = this.minimax(board, depth + 1, false);
            board[row][col] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            board[row][col] = this.humanPlayer;
            const score = this.minimax(board, depth + 1, true);
            board[row][col] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  private checkWinner(board: Board): Player {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return board[i][0];
      }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
      if (board[0][j] && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
        return board[0][j];
      }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return board[0][2];
    }

    return null;
  }

  private isBoardFull(board: Board): boolean {
    return board.every(row => row.every(cell => cell !== null));
  }

  private getEmptySpots(board: Board): { row: number; col: number }[] {
    const emptySpots: { row: number; col: number }[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          emptySpots.push({ row, col });
        }
      }
    }
    return emptySpots;
  }
}
