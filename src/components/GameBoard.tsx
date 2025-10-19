import { useState, useEffect, useRef } from "react";
import { GridLine } from "./GridLine";
import { SphereMesh } from "./SphereMesh";
import { CubeMesh } from "./CubeMesh";
import { WinnerLine } from "./WinnerLine";
import { ThreeEvent } from "@react-three/fiber";
import { AIPlayer } from "@/lib/aiPlayer";

type Player = "sphere" | "cube" | null;
type Board = Player[][];

interface GameBoardProps {
  onGameStateChange: (winner: Player, isTie: boolean, currentPlayer: Player) => void;
  gameMode: "friend" | "computer";
}

export const GameBoard = ({ onGameStateChange, gameMode }: GameBoardProps) => {
    const [board, setBoard] = useState<Board>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"sphere" | "cube">("sphere");
  const [winner, setWinner] = useState<Player>(null);
  const [winnerLine, setWinnerLine] = useState<{ start: [number, number, number]; end: [number, number, number] } | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const aiPlayerRef = useRef<AIPlayer | null>(null);

  // Initialize AI player
  useEffect(() => {
    if (gameMode === "computer") {
      aiPlayerRef.current = new AIPlayer("cube", "sphere");
    }
  }, [gameMode]);

  const checkWinner = (newBoard: Board): Player => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (newBoard[i][0] && newBoard[i][0] === newBoard[i][1] && newBoard[i][0] === newBoard[i][2]) {
        const y = (1 - i) * 1;
        setWinnerLine({ start: [-1.2, y, 0], end: [1.2, y, 0] });
        return newBoard[i][0];
      }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
      if (newBoard[0][j] && newBoard[0][j] === newBoard[1][j] && newBoard[0][j] === newBoard[2][j]) {
        const x = (j - 1) * 1;
        setWinnerLine({ start: [x, 1.2, 0], end: [x, -1.2, 0] });
        return newBoard[0][j];
      }
    }

    // Check diagonals
    if (newBoard[0][0] && newBoard[0][0] === newBoard[1][1] && newBoard[0][0] === newBoard[2][2]) {
      setWinnerLine({ start: [-1.2, 1.2, 0], end: [1.2, -1.2, 0] });
      return newBoard[0][0];
    }
    if (newBoard[0][2] && newBoard[0][2] === newBoard[1][1] && newBoard[0][2] === newBoard[2][0]) {
      setWinnerLine({ start: [1.2, 1.2, 0], end: [-1.2, -1.2, 0] });
      return newBoard[0][2];
    }

    return null;
  };

  const checkTie = (newBoard: Board): boolean => {
    return newBoard.every(row => row.every(cell => cell !== null));
  };

    // AI move logic
  useEffect(() => {
    if (gameMode === "computer" && currentPlayer === "cube" && !winner && !isAiThinking) {
      setIsAiThinking(true);
      
            // Add slight delay to make it feel more natural
      const delay = setTimeout(() => {
        if (aiPlayerRef.current) {
          const bestMove = aiPlayerRef.current.getBestMove(board, "medium");
          if (bestMove) {
            makeMove(bestMove.row, bestMove.col);
          }
        }
        setIsAiThinking(false);
      }, 300); // 300ms delay for AI thinking

      return () => clearTimeout(delay);
    }
  }, [currentPlayer, gameMode, board, winner, isAiThinking]);

  const makeMove = (row: number, col: number) => {
    if (winner || board[row][col]) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    const isTie = !gameWinner && checkTie(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      onGameStateChange(gameWinner, false, currentPlayer);
    } else if (isTie) {
      onGameStateChange(null, true, currentPlayer);
    } else {
      const nextPlayer = currentPlayer === "sphere" ? "cube" : "sphere";
      setCurrentPlayer(nextPlayer);
      onGameStateChange(null, false, nextPlayer);
    }
  };

  const handleClick = (event: ThreeEvent<MouseEvent>, row: number, col: number) => {
    event.stopPropagation();
    
    // In computer mode, only allow human (sphere) to click
    if (gameMode === "computer" && currentPlayer === "cube") return;
    if (isAiThinking) return;
    
    makeMove(row, col);
  };

  const resetGame = () => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setCurrentPlayer("sphere");
    setWinner(null);
    setWinnerLine(null);
    onGameStateChange(null, false, "sphere");
  };

  // Expose reset function
  (window as any).resetTicTacToe = resetGame;

  const isWinningCell = (row: number, col: number): boolean => {
    if (!winner || !winnerLine) return false;
    
    // Check if this cell is part of the winning combination
    // by checking all possible winning combinations
    const winningCombinations = [
      // Rows
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      // Columns
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      // Diagonals
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ];

    for (const combo of winningCombinations) {
      const isWinningCombo = combo.every(([r, c]) => board[r][c] === winner);
      if (isWinningCombo && combo.some(([r, c]) => r === row && c === col)) {
        return true;
      }
    }
    return false;
  };

  const isTieGame = !winner && board.every(row => row.every(cell => cell !== null));

  const renderShape = (player: Player, row: number, col: number) => {
    const x = (col - 1) * 1;
    const y = (1 - row) * 1;
    const position: [number, number, number] = [x, y, 0];
    const isWinner = isWinningCell(row, col);
    const isTie = isTieGame && !winner;

    if (player === "sphere") {
      return <SphereMesh key={`${row}-${col}`} position={position} isWinner={isWinner} isTie={isTie} />;
    } else if (player === "cube") {
      return <CubeMesh key={`${row}-${col}`} position={position} isWinner={isWinner} isTie={isTie} />;
    }
    return null;
  };

  return (
    <>
      {/* Grid Lines */}
      <GridLine start={[-0.5, -1.5, 0]} end={[-0.5, 1.5, 0]} />
      <GridLine start={[0.5, -1.5, 0]} end={[0.5, 1.5, 0]} />
      <GridLine start={[-1.5, -0.5, 0]} end={[1.5, -0.5, 0]} />
      <GridLine start={[-1.5, 0.5, 0]} end={[1.5, 0.5, 0]} />

      {/* Clickable Grid Cells */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const x = (col - 1) * 1;
          const y = (1 - row) * 1;
          return (
            <mesh
              key={`${row}-${col}`}
              position={[x, y, -0.1]}
              onClick={(e) => handleClick(e, row, col)}
            >
              <planeGeometry args={[0.9, 0.9]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          );
        })
      )}

      {/* Render Shapes */}
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => renderShape(cell, rowIndex, colIndex))
      )}

      {/* Winner Line */}
      {winnerLine && <WinnerLine start={winnerLine.start} end={winnerLine.end} />}
    </>
  );
};
