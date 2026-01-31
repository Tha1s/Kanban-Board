export type Card = {
  id: string;
  title: string;
  description?: string;
};

export type ColumnId = 'todo' | 'doing' | 'done';

export type Column = {
  id: ColumnId;
  title: string;
  cards: Card[];
};

export type BoardState = Record<ColumnId, Column>;