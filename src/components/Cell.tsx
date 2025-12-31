import { Cell as CellType } from '../hooks/useMinesweeper';

interface CellProps {
  cell: CellType;
  onReveal: () => void;
  onToggleFlag: () => void;
}

export const Cell = ({ cell, onReveal, onToggleFlag }: CellProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cell.state === 'hidden') {
      onReveal();
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleFlag();
  };

  const getCellContent = () => {
    if (cell.state === 'flagged') {
      return '🚩';
    }
    if (cell.state === 'revealed') {
      if (cell.isMine) {
        return '💣';
      }
      if (cell.adjacentMines > 0) {
        return cell.adjacentMines.toString();
      }
      return '';
    }
    return '';
  };

  const getCellClassName = () => {
    const baseClasses = 'w-10 h-10 border-2 border-gray-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors';
    
    if (cell.state === 'revealed') {
      if (cell.isMine) {
        return `${baseClasses} bg-red-500 border-red-700`;
      }
      return `${baseClasses} bg-gray-600 border-gray-500`;
    }
    
    if (cell.state === 'flagged') {
      return `${baseClasses} bg-yellow-600 border-yellow-500 hover:bg-yellow-500`;
    }
    
    return `${baseClasses} bg-gray-700 border-gray-600 hover:bg-gray-600`;
  };

  const getTextColor = () => {
    if (cell.state === 'revealed' && !cell.isMine && cell.adjacentMines > 0) {
      const colors = [
        '', // 0
        'text-blue-300', // 1
        'text-green-300', // 2
        'text-red-300', // 3
        'text-purple-300', // 4
        'text-yellow-300', // 5
        'text-pink-300', // 6
        'text-gray-200', // 7
        'text-white', // 8
      ];
      return colors[cell.adjacentMines] || '';
    }
    return '';
  };

  return (
    <div
      className={`${getCellClassName()} ${getTextColor()}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {getCellContent()}
    </div>
  );
};

