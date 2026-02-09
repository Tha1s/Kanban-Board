import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';

export default function App() {
  const boardHook = useBoard();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto p-16">
        <Board boardHook={boardHook} />
      </div>
    </div>
  );
}