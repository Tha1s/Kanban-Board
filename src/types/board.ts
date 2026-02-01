export type TagColor = 'high priority' | 'medium priority' | 'low priority';

export type Card = {
  id: string;
  title: string;
  description?: string;
  tag?: TagColor | null;
};

export type ColumnId = 'todo' | 'doing' | 'done';

export type Column = {
  id: ColumnId;
  title: string;
  cards: Card[];
};

export type BoardState = Record<ColumnId, Column>;