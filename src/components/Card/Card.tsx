import React from 'react';
import type { Card as CardType } from '../../types/board';

type Props = {
    card: CardType;
    onDragStart: (cardId: string) => void;
}

export default function Card({ card, onDragStart}: Props) {
    return (
        <div
            className='p-2 mb-2 bg-white rounded shadow cursor-move'
            draggable
            onDragStart={() => onDragStart(card.id)}
        >
            {card.title}
        </div>
    )
}
