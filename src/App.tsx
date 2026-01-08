import { Board } from './components/Board';

function App() {
  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col items-center justify-center relative">
      <div className="flex-1 flex items-center justify-center w-full px-2 md:px-4">
        <Board />
      </div>
      
      <footer className="w-full py-4 md:py-6 px-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 border-t border-gray-700/50 bg-gray-800/50">
        <p className="text-gray-400 text-xs md:text-base font-light text-center md:text-left">
          © 2026 Todos los derechos reservados
        </p>
        <span className="hidden md:inline text-gray-600">|</span>
        <p className="text-gray-500 text-xs md:text-base font-light text-center md:text-left">
          Creado y diseñado por{' '}
          <a 
            href="https://www.instagram.com/cxmpedev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 font-medium hover:text-white transition-colors underline decoration-gray-500 hover:decoration-gray-300"
          >
            cxmpedev
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

