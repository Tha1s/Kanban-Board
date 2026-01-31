import React from 'react';
import type { Column as ColumnType, ColumnId } from '../../types/board';
import Card from '../Card/Card';

type Props = {
    column: ColumnType;
    columnId: ColumnId;
    onDropCard: (to: ColumnId) => void;
    onDragStart: (cardId: string) => void;
}

export default function Column({ column, columnId, onDropCard, onDragStart}: Props) {
    return (
        <div
      className="w-64 p-2 bg-gray-100 rounded"
      onDragOver={(e) => e.preventDefault()} // permet le drop
      onDrop={() => onDropCard(columnId)}   // drop d'une seule carte
    >
      <h2 className="font-bold mb-2">{column.title}</h2>
      {column.cards.map((card) => (
        <Card key={card.id} card={card} onDragStart={onDragStart} />
      ))}
    </div>
  );
}