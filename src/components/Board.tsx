import { useMinesweeper } from '../hooks/useMinesweeper';
import { Cell } from './Cell';

export const Board = () => {
  const { board, gameStatus, revealCell, toggleFlag, resetGame } = useMinesweeper({
    rows: 10,
    cols: 10,
    mines: 15,
  });

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return '¡Ganaste! 🎉';
    }
    if (gameStatus === 'lost') {
      return '¡Perdiste! 💥';
    }
    return 'Jugando...';
  };

  const getStatusColor = () => {
    if (gameStatus === 'won') {
      return 'text-green-400';
    }
    if (gameStatus === 'lost') {
      return 'text-red-400';
    }
    return 'text-gray-300';
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-3xl font-bold text-white mb-2">Buscaminas</h1>
      
      <div className={`text-xl font-semibold ${getStatusColor()}`}>
        {getStatusMessage()}
      </div>

      <div className="grid grid-cols-10 gap-1 p-4 bg-gray-800 rounded-lg shadow-lg">
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

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
      >
        Reiniciar Juego
      </button>

      <div className="text-sm text-gray-300 mt-2">
        <p>💡 Clic izquierdo: Revelar celda</p>
        <p>🚩 Clic derecho: Marcar/desmarcar bandera</p>
      </div>
    </div>
  );
};

