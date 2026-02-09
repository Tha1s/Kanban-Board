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

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setSelectedTag(null);
    setAdding(false);
  };


  return (
    
    <div
      className="w-72 sm:w-[32%] flex-shrink-0 bg-[#F2F2F2] rounded-[24px] p-4 flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropCard(columnId)}
    >
      <h2 className="text-2xl mb-4">{column.title}</h2>
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
        className="mt-3 w-full border border-teal-400 text-teal-500 text-2xl py-3 rounded-full">
          + Create card
        </button>
      )}

      {adding && (
        <div className={'bg-white rounded-2xl p-4 mb-4'}>
          <h3 className='font-semibold'>Create card</h3>
          <div className="mt-2 space-y-2">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Card title*"
              className="w-full bg-white border rounded-lg px-3 py-2 text-sm outline-none"
              autoFocus
            />

            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="w-full bg-white border rounded-lg px-3 py-2 text-sm outline-none resize-none"
              rows={2}
            />

            <div className="flex gap-1">
              {(['low priority','medium priority','high priority'] as TagColor[]).map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`w-3 h-3 rounded-full ${TAG_COLORS[tag]} ${
                    selectedTag === tag ? 'w-4 h-4' : ''
                  }`}
                />
              ))}
              <button
                onClick={() => setSelectedTag(null)}
                className={`w-3 h-3 rounded-full bg-[#D9D9D9] ${
                    selectedTag === null ? 'w-4 h-4' : ''
                  }`}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="bg-teal-500 text-white text-sm px-3 py-1 rounded-full"
              >
                Create
              </button>
              <button
                onClick={resetForm}
                className="border border-teal-400 text-teal-500 text-sm px-3 py-1 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
