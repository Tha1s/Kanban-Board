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
            className={`bg-white rounded-2xl p-4 mb-4 cursor-move transition
              ${isDragging ? 'scale-105 shadow-xl' : ''}`}
            draggable
            onDragStart={() => onDragStart(card.id)}
        >
            <div className="flex justify-between items-start">
                <h3 className="font-semibold">{card.title}</h3>
                <button
                    onClick={() => onRemove(card.id)}
                    className="text-gray-400 hover:text-red-500"
                >
                    ✕
                </button>
            </div>

            {card.description && (
                <p className="mt-2 text-sm text-black whitespace-pre-line break-words leading-relaxed">
                    {card.description}
                </p>
            )}

            {card.tag && (
                <span className={`mt-3 inline-block px-2 py-1 text-xs rounded-full ${TAG_COLORS[card.tag]}`}>
                    {card.tag}
                </span>
            )}

        </div>
    );
}
