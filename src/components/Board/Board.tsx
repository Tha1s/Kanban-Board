import { useState } from 'react';
import Column from '../Column/Column';
import { useBoard } from '../../hooks/useBoard';
import type { TagColor, ColumnId } from '../../types/board';
import { TAG_COLORS } from '../../utils/tags';

type UseBoardType = ReturnType<typeof useBoard>;

type Props = {
  boardHook: UseBoardType;
};

export default function Board({ boardHook }: Props) {
  const { board, addCard, moveCard, removeCard } = boardHook;

  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const [filterTag, setFilterTag] = useState<TagColor | null>(null);

  const handleDragStart = (cardId: string) => {
      setDraggedCard(cardId);
  };

  const handleDrop = (to: ColumnId) => {
      if (!draggedCard) return;

      const from = Object.values(board).find(col =>
          col.cards.some(c => c.id === draggedCard)
      )?.id as ColumnId;

      if (from && from !== draggedCard) {
          moveCard(from, to, draggedCard);
      }

      setDraggedCard(null);
  }
  
  const handleRemoveCard = (columnId: ColumnId, cardId: string) => {
      removeCard(columnId, cardId);
  };

  return (
    <div className='flex flex-wrap flex-col'>
      {<div className="flex gap-2 mb-4">
      {(['high priority', 'medium priority', 'low priority'] as TagColor[]).map(tag => (
        <button
          key={tag}
          onClick={() => setFilterTag(tag)}
          className={`px-3 py-1 rounded text-white text-sm ${TAG_COLORS[tag]}`}
        >
          {tag}
        </button>
      ))}
      <button onClick={() => setFilterTag(null)}>All</button>
      </div>}
      <div className="flex flex-wrap gap-4 p-4">
        {Object.values(board).map((col) => (
          <Column
            key={col.id}
            column={col}
            columnId={col.id}
            filterTag={filterTag}
            onAddCard={addCard}
            onDropCard={handleDrop}
            onDragStart={handleDragStart}
            onRemoveCard={handleRemoveCard}
            draggedCard={draggedCard}
          />
        ))}
      </div>
    </div>
  );
}