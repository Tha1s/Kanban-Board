import { useState, useEffect } from "react";
import type { BoardState, Card, ColumnId } from "../types/board";

const STORAGE_KEY = 'kanban-board';

const initialBoardState: BoardState = {
    todo: { id: 'todo', title: 'To Do', cards: [] },
    doing: { id: 'doing', title: 'Doing', cards: [] },
    done: { id: 'done', title: 'Done', cards: [] },
};

const getInitialBoard = (): BoardState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return initialBoardState;

  try {
    return JSON.parse(stored);
  } catch {
    return initialBoardState;
  }
};

export function useBoard() {
    const [board, setBoard] = useState<BoardState>(getInitialBoard);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    }, [board]);

    const addCard = (columnId: ColumnId, card: Card) => {
        setBoard(prev => ({
            ...prev,
            [columnId]: {
                ...prev[columnId],
                cards: [...prev[columnId].cards, card],
            },
        }));
    };

    const removeCard = (columnId: ColumnId, cardId: string) => {
        setBoard(prev => ({
            ...prev,
            [columnId]: {
                ...prev[columnId],
                cards: prev[columnId].cards.filter(c => c.id !== cardId),
            },
        }));
    };

    const moveCard = (from: ColumnId, to: ColumnId, cardId: string) => {
        if (from === to) return;
        
        setBoard(prev => {
            const cardToMove = prev[from].cards.find(c => c.id === cardId);
            if (!cardToMove) return prev;

            return {
                ...prev,
                [from]: {
                    ...prev[from],
                    cards: prev[from].cards.filter(c => c.id !== cardId),
                },
                [to]: {
                    ...prev[to],
                    cards: [...prev[to].cards, cardToMove],
                }
            }
        })
    }

    return { board, addCard, removeCard, moveCard};
}