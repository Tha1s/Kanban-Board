import { useState } from 'react';
import type { Column as ColumnType, ColumnId } from '../../types/board';
import Card from '../Card/Card';
import type { TagColor } from '../../types/board';
import { TAG_COLORS } from '../../utils/tags';

type Props = {
  column: ColumnType;
  columnId: ColumnId;
  filterTag: TagColor | null;
  onDropCard: (to: ColumnId) => void;
  onDragStart: (cardId: string) => void;
  onRemoveCard: (columnId: ColumnId, cardId: string) => void;
  onAddCard: (
    columnId: ColumnId,
    card: {
      id: string;
      title: string;
      description?: string;
      tag: TagColor | null;
    }
  ) => void;
  draggedCard: string | null; 
};

export default function Column({ column, columnId, filterTag, onDropCard, onDragStart, onRemoveCard, onAddCard, draggedCard }: Props) {
  const visibleCards = column.cards.filter(card =>
    filterTag === null || card.tag === filterTag
  );

  const handleAdd = () => {
    if (!newTitle.trim()) return;

    onAddCard(columnId, {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      tag: selectedTag,
    });

    setNewTitle('');
    setNewDescription('');
    setSelectedTag(null);
    setAdding(false);
  };

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [adding, setAdding] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagColor | null>(null);

  return (
    
    <div
      className="w-full sm:w-64 p-2 bg-gray-100 rounded"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropCard(columnId)}
    >
      <h2 className="font-bold mb-2">{column.title}</h2>
      {visibleCards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStart={onDragStart}
          onRemove={(cardId) => onRemoveCard(columnId, cardId)}
          isDragging={draggedCard === card.id}
        />
      ))}
      {!adding && (
        <button
          onClick={() => setAdding(true)}
          className="mt-2 text-sm text-gray-500 hover:text-gray-800"
        >
          + Add card
        </button>
      )}

      {adding && (
        <div className="mt-2 space-y-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Card title"
            className="w-full p-1 border rounded"
            autoFocus
          />

          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full p-1 border rounded text-sm"
            rows={2}
          />

          <div className="flex gap-1 items-center">
            {(['high priority', 'medium priority', 'low priority'] as TagColor[]).map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`w-4 h-4 rounded-full ${TAG_COLORS[tag]} ${
                  selectedTag === tag ? 'ring-2 ring-black' : ''
                }`}
              >
              </button>
            ))}
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs text-gray-500 ml-2"
            >
              none
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add
            </button>
            <button
              onClick={() => setAdding(false)}
              className="text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
