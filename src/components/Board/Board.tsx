import { useState } from 'react';
import Column from '../Column/Column';
import type { ColumnId } from '../../types/board';
import { useBoard } from '../../hooks/useBoard';

type UseBoardType = ReturnType<typeof useBoard>;

type Props = {
  boardHook: UseBoardType; // contient board, addCard, moveCard, etc.
};

export default function Board({ boardHook }: Props) {
  const { board, moveCard, removeCard } = boardHook;
    const [draggedCard, setDraggedCard] = useState<string | null>(null);

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
    <div className="flex flex-wrap gap-4 p-4">
      {Object.values(board).map((col) => (
        <Column
          key={col.id}
          column={col}
          columnId={col.id}
          onDropCard={handleDrop}
          onDragStart={handleDragStart}
          onRemoveCard={handleRemoveCard}
          draggedCard={draggedCard}
        />
      ))}
    </div>
  );
}