import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';
import { v4 as uuid } from 'uuid';

export default function App() {
  const boardHook = useBoard(); // UNE SEULE INSTANCE

  return (
    <div className="p-4 min-h-screen bg-gray-200">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => boardHook.addCard('todo', { id: uuid(), title: 'Nouvelle carte' })}
      >
        Ajouter une carte
      </button>

      <Board boardHook={boardHook} />
    </div>
  );
}