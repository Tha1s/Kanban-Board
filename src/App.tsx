import { useState } from 'react';
import Board from './components/Board/Board';
import { useBoard } from './hooks/useBoard';
import { v4 as uuid } from 'uuid';

export default function App() {
  const boardHook = useBoard(); // UNE SEULE INSTANCE
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [adding, setAdding] = useState(false);

  const handleAddCard = () => {
    const title = newTitle.trim();
    if (!title) return; // ✅ sécurité : titre vide interdit
    boardHook.addCard('todo', { id: uuid(), title, description: newDescription.trim() });
    setNewTitle('');
    setNewDescription('');
    setAdding(false);
  };
  return (
    <div className="p-4 min-h-screen bg-gray-200">
      {adding ? (
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            className="px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title*"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) handleAddCard();
              if (e.key === 'Escape') {
                setAdding(false);
                setNewTitle('');
                setNewDescription('');
              }
            }}
            autoFocus
          />
          <textarea
            className="px-2 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleAddCard}
            >
              Add
            </button>
            <button
              className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={() => {
                setAdding(false);
                setNewTitle('');
                setNewDescription('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setAdding(true)}
        >
          New card
        </button>
      )}

      <Board boardHook={boardHook} />
    </div>
  );
}