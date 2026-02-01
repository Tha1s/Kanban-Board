import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';

export default function App() {
  const boardHook = useBoard();

  return (
    <div className="p-4 min-h-screen bg-gray-200">
      <Board boardHook={boardHook} />
    </div>
  );
}