import { useState, useCallback, useEffect } from 'react';

export type CellState = 'hidden' | 'revealed' | 'flagged';

export interface Cell {
  isMine: boolean;
  state: CellState;
  adjacentMines: number;
}

export type GameStatus = 'playing' | 'won' | 'lost';

interface UseMinesweeperProps {
  rows: number;
  cols: number;
  mines: number;
}

export const useMinesweeper = ({ rows, cols, mines }: UseMinesweeperProps) => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [firstClick, setFirstClick] = useState(true);

  // Inicializar el tablero
  const initializeBoard = useCallback((excludeRow?: number, excludeCol?: number) => {
    const newBoard: Cell[][] = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            isMine: false,
            state: 'hidden' as CellState,
            adjacentMines: 0,
          }))
      );

    // Colocar minas aleatoriamente
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);

      // No colocar mina en la celda excluida (primer clic) ni si ya tiene mina
      if (
        !newBoard[row][col].isMine &&
        !(excludeRow !== undefined && excludeCol !== undefined && row === excludeRow && col === excludeCol)
      ) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calcular minas adyacentes
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const newRow = row + dr;
              const newCol = col + dc;
              if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                newBoard[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[row][col].adjacentMines = count;
        }
      }
    }

    return newBoard;
  }, [rows, cols, mines]);

  // Revelar celda
  const revealCell = useCallback(
    (row: number, col: number) => {
      if (gameStatus !== 'playing') return;

      setBoard((prevBoard) => {
        // Si es el primer clic, inicializar el tablero sin mina en esa posición
        if (firstClick) {
          setFirstClick(false);
          const newBoard = initializeBoard(row, col);
          return revealCellRecursive(newBoard, row, col);
        }

        const newBoard = prevBoard.map((r) => r.map((c) => ({ ...c })));

        // Si la celda está marcada o ya está revelada, no hacer nada
        if (newBoard[row][col].state !== 'hidden') {
          return newBoard;
        }

        // Si es una mina, perder
        if (newBoard[row][col].isMine) {
          setGameStatus('lost');
          // Revelar todas las minas
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (newBoard[r][c].isMine) {
                newBoard[r][c].state = 'revealed';
              }
            }
          }
          return newBoard;
        }

        return revealCellRecursive(newBoard, row, col);
      });
    },
    [gameStatus, firstClick, initializeBoard, rows, cols]
  );

  // Función recursiva para revelar celdas (flood fill)
  const revealCellRecursive = (board: Cell[][], row: number, col: number): Cell[][] => {
    // Verificar límites
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return board;
    }

    const cell = board[row][col];

    // Si ya está revelada o marcada, no hacer nada
    if (cell.state !== 'hidden') {
      return board;
    }

    // Revelar la celda
    cell.state = 'revealed';

    // Si tiene minas adyacentes, no revelar vecinos
    if (cell.adjacentMines > 0) {
      return board;
    }

    // Si no tiene minas adyacentes, revelar todos los vecinos
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        revealCellRecursive(board, row + dr, col + dc);
      }
    }

    return board;
  };

  // Marcar/desmarcar celda con bandera
  const toggleFlag = useCallback(
    (row: number, col: number) => {
      if (gameStatus !== 'playing') return;

      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((r) => r.map((c) => ({ ...c })));
        const cell = newBoard[row][col];

        if (cell.state === 'hidden') {
          cell.state = 'flagged';
        } else if (cell.state === 'flagged') {
          cell.state = 'hidden';
        }

        return newBoard;
      });
    },
    [gameStatus]
  );

  // Verificar si el juego está ganado
  useEffect(() => {
    if (gameStatus !== 'playing' || board.length === 0) return;

    let allNonMinesRevealed = true;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = board[row][col];
        if (!cell.isMine && cell.state !== 'revealed') {
          allNonMinesRevealed = false;
          break;
        }
      }
      if (!allNonMinesRevealed) break;
    }

    if (allNonMinesRevealed) {
      setGameStatus('won');
    }
  }, [board, gameStatus, rows, cols]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setGameStatus('playing');
    setFirstClick(true);
  }, [initializeBoard]);

  // Inicializar el tablero al montar
  useEffect(() => {
    if (board.length === 0) {
      setBoard(initializeBoard());
    }
  }, [board.length, initializeBoard]);

  return {
    board,
    gameStatus,
    revealCell,
    toggleFlag,
    resetGame,
  };
};

