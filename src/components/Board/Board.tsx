import { useState, useEffect, useRef } from 'react';
import Column from '../Column/Column';
import { useBoard } from '../../hooks/useBoard';
import type { TagColor, ColumnId } from '../../types/board';
import { TAG_COLORS } from '../../utils/tags';

type UseBoardType = ReturnType<typeof useBoard>;

type Props = {
  boardHook: UseBoardType;
};

export default function Board({ boardHook }: Props) {
  const { board, importBoard, addCard, moveCard, removeCard } = boardHook;

  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const [filterTag, setFilterTag] = useState<TagColor | null>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const settingsRef = useRef<HTMLDivElement>(null);


  const handleDragStart = (cardId: string) => {
      setDraggedCard(cardId);
  };

  const handleDrop = (to: ColumnId) => {
      if (!draggedCard) return;

      const from = Object.values(board).find(col =>
          col.cards.some(c => c.id === draggedCard)
      )?.id as ColumnId;

      if (from && from !== to) {
          moveCard(from, to, draggedCard);
      }

      setDraggedCard(null);
  }
  
  const handleRemoveCard = (columnId: ColumnId, cardId: string) => {
      removeCard(columnId, cardId);
  };

  const handleExport = () => {
    const json = JSON.stringify(board, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'kanban-board.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingsOpen(false);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        const success = importBoard(parsed);

        if (!success) {
          alert('Invalid board file');
        }
      } catch {
        alert('Invalid JSON');
      }
    };

    reader.readAsText(file);
  };


  return (
    <div className='flex flex-wrap flex-col'>
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-9xl">Your tasks</h1>
        <div className="flex gap-4 ml-auto">
          {(['high priority', 'medium priority', 'low priority'] as TagColor[]).map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-2 rounded-full text-2xl ${TAG_COLORS[tag]}`}
            >
              {tag}
            </button>
          ))}
          <button
          className={`px-3 py-2 rounded-full text-2xl text-black bg-[#F2F2F2]`} 
          onClick={() => setFilterTag(null)}>all</button>


        </div>

        <div className="relative px-9" ref={settingsRef}>
          <button
            onClick={() => setSettingsOpen(v => !v)}
            className="px-3 py-2 rounded-full text-2xl text-black bg-[#F2F2F2]"
          >
            Settings
          </button>

          {settingsOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg text-sm z-50">
              <button
                onClick={() => {
                  handleExport();
                  setSettingsOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Export JSON
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Import JSON
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-6 items-start overflow-x-auto">
        {Object.values(board).map((col) => (
          <Column
            key={col.id}
            column={col}
            columnId={col.id}
            filterTag={filterTag}
            onAddCard={addCard}
            onDropCard={handleDrop}
            onDragStart={handleDragStart}
            onRemoveCard={handleRemoveCard}
            draggedCard={draggedCard}
          />
        ))}
      </div>

      {/* <button onClick={handleExport}>
        Export JSON
      </button>
      <button onClick={() => fileInputRef.current?.click()}>
        Import JSON
      </button>*/}

      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleImport}
        hidden
      /> 


    </div>
  );
}