import { useState } from 'react';
import { useMinesweeper } from '../hooks/useMinesweeper';
import { Cell } from './Cell';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface DifficultyConfig {
  rows: number;
  cols: number;
  mines: number;
  label: string;
}

const difficulties: Record<Difficulty, DifficultyConfig> = {
  easy: { rows: 9, cols: 9, mines: 10, label: 'Fácil' },
  medium: { rows: 16, cols: 16, mines: 40, label: 'Medio' },
  hard: { rows: 16, cols: 30, mines: 99, label: 'Difícil' },
  expert: { rows: 20, cols: 30, mines: 120, label: 'Experto' },
};

export const Board = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const config = difficulties[difficulty];
  
  const { board, revealCell, toggleFlag, resetGame, flaggedCount } = useMinesweeper({
    rows: config.rows,
    cols: config.cols,
    mines: config.mines,
  });

  const minesRemaining = config.mines - flaggedCount;

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 max-w-7xl w-full">
      <h1 className="text-3xl font-bold text-white mb-2">Buscaminas</h1>
      
      {/* Selector de Dificultad */}
      <div className="flex gap-2 mb-2 flex-wrap justify-center">
        {(Object.keys(difficulties) as Difficulty[]).map((diff) => (
          <button
            key={diff}
            onClick={() => handleDifficultyChange(diff)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              difficulty === diff
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {difficulties[diff].label}
          </button>
        ))}
      </div>

      {/* Contador de Minas */}
      <div className="flex items-center justify-center mb-2">
        <div className="bg-gray-800 px-4 py-3 rounded-lg border-2 border-gray-600 shadow-inner">
          <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Minas</div>
          <div className="text-3xl font-bold text-red-500 font-mono tracking-wider" style={{ fontFamily: 'monospace', textShadow: '0 0 5px rgba(239, 68, 68, 0.5)' }}>
            {Math.max(0, minesRemaining).toString().padStart(3, '0')}
          </div>
        </div>
      </div>

      {/* Tablero */}
      <div className="overflow-x-auto w-full flex justify-center">
        <div 
          className="grid gap-1 p-4 bg-gray-800 rounded-lg shadow-lg inline-grid"
          style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))` }}
        >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onReveal={() => revealCell(rowIndex, colIndex)}
              onToggleFlag={() => toggleFlag(rowIndex, colIndex)}
            />
          ))
        )}
        </div>
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
      >
        Reiniciar Juego
      </button>

      <div className="text-sm text-gray-300 mt-2 text-center">
        <p>💡 Clic izquierdo: Revelar celda</p>
        <p>🚩 Clic derecho: Marcar/desmarcar bandera</p>
        <p className="mt-1 text-gray-400">
          Tablero: {config.rows}x{config.cols} | Minas: {config.mines}
        </p>
      </div>
    </div>
  );
};

