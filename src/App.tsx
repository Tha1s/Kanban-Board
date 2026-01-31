import { useBoard } from './hooks/useBoard';
import { v4 as uuid } from 'uuid';

export default function App() {
  const { board, addCard} = useBoard();

  return (
    <div className="p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => addCard('todo', { id: uuid(), title: 'Nouvelle carte' })}
      >
        Ajouter une carte
      </button>

      {Object.values(board).map(column => (
        <div key={column.id}>
          <h2>{column.title}</h2>
          <ul>
            {column.cards.map(card => (
              <li key={card.id}>{card.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
