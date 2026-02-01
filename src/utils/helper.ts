import type { BoardState } from "../types/board";

const REQUIRED_COLUMNS = ['todo', 'doing', 'done'] as const;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isValidCard = (card: unknown): boolean => {
  if (!isObject(card)) return false;

  return (
    typeof card.id === 'string' &&
    typeof card.title === 'string' &&
    (card.description === undefined || typeof card.description === 'string') &&
    (card.tag === null ||
      card.tag === 'red' ||
      card.tag === 'yellow' ||
      card.tag === 'green' ||
      card.tag === 'blue')
  );
};

const isValidColumn = (column: unknown): boolean => {
  if (!isObject(column)) return false;
  if (typeof column.title !== 'string') return false;
  if (!Array.isArray(column.cards)) return false;

  return column.cards.every(isValidCard);
};

export const isValidBoard = (data: unknown): data is BoardState => {
  if (!isObject(data)) return false;

  return REQUIRED_COLUMNS.every(key =>
    isValidColumn((data as any)[key])
  );
};

