import { useMinesweeper } from '../hooks/useMinesweeper';
import { Cell } from './Cell';

export const Board = () => {
  const { board, revealCell, toggleFlag, resetGame } = useMinesweeper({
    rows: 10,
    cols: 10,
    mines: 15,
  });

  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 p-3 md:p-6 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font text-white mb-1 md:mb-2 title-buscaminas">Buscaminas</h1>

      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-800 rounded-lg w-full max-w-2xl">
        <button
          onClick={resetGame}
          className="w-full md:w-auto px-4 md:px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-md text-sm md:text-base"
        >
          Reiniciar Juego
        </button>

        <div className="text-xs md:text-sm text-gray-300 text-center md:text-left">
          <p>💡 Clic izquierdo: Revelar celda</p>
          <p>🚩 Clic derecho: Marcar/desmarcar bandera</p>
        </div>
      </div>

      <div className="relative grid grid-cols-10 gap-0.5 md:gap-1 p-2 md:p-4 bg-gray-800 rounded-lg shadow-lg w-full max-w-fit">
        {/* Logo de fondo en el tablero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden rounded-lg">
          <img 
            src="/Logo estilo hacker c.png" 
            alt="Logo fondo" 
            className="h-full w-auto opacity-10 md:opacity-20"
          />
        </div>
        
        {/* Celdas del tablero */}
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
  );
};


