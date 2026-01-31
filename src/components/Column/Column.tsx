import type { Column as ColumnType, ColumnId } from '../../types/board';
import Card from '../Card/Card';

type Props = {
  column: ColumnType;
  columnId: ColumnId;
  onDropCard: (to: ColumnId) => void;
  onDragStart: (cardId: string) => void;
  onRemoveCard: (columnId: ColumnId, cardId: string) => void;
  draggedCard: string | null; 
};

export default function Column({ column, columnId, onDropCard, onDragStart, onRemoveCard, draggedCard }: Props) {
  return (
    <div
      className="w-full sm:w-64 p-2 bg-gray-100 rounded"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropCard(columnId)}
    >
      <h2 className="font-bold mb-2">{column.title}</h2>
      {column.cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStart={onDragStart}
          onRemove={(cardId) => onRemoveCard(columnId, cardId)}
          isDragging={draggedCard === card.id}
        />
      ))}
    </div>
  );
}
