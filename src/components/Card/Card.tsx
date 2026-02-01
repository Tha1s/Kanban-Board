import type { Card as CardType } from '../../types/board';
import { TAG_COLORS } from '../../utils/tags';

type Props = {
    card: CardType;
    onDragStart: (cardId: string) => void;
    onRemove: (cardId: string) => void;
    isDragging?: boolean;
}

export default function Card({ card, onDragStart, onRemove, isDragging}: Props) {
    return (
        <div
            className={`p-2 mb-2 bg-white rounded shadow cursor-move flex flex-col justify-between items-center
                <<transition-transform duration-200
                ${isDragging ? 'shadow-xl scale-105' : 'shadow'}`}
            draggable
            onDragStart={() => onDragStart(card.id)}
        >
            <div className="flex justify-between items-center">
                <span className="font-semibold">{card.title}</span>
                <button
                className="text-red-500 font-bold ml-2 hover:text-red-700"
                onClick={() => onRemove(card.id)}
                >
                    ✕
                </button>
            </div>
            {card.tag && (
                <span
                className={`px-2 py-0.5 rounded-full text-xs ${TAG_COLORS[card.tag]}`}
                >
                    {card.tag}
                </span>
            )}

            {card.description && (
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{card.description}</p>
            )}
        </div>
    );
}
