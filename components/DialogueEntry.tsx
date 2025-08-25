
import React from 'react';
import { Dialogue, Character } from '../types';
import { Card } from './ui/Card';
import { Select } from './ui/Select';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface DialogueEntryProps {
  dialogue: Dialogue;
  characters: Character[];
  onUpdate: (dialogue: Dialogue) => void;
  onDelete: (id: string) => void;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

export const DialogueEntry: React.FC<DialogueEntryProps> = ({ dialogue, characters, onUpdate, onDelete }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    onUpdate({ ...dialogue, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <div className="flex items-start space-x-4">
        <div className="flex-grow space-y-4">
           <Select
              label="Karakter"
              id={`characterId-${dialogue.id}`}
              name="characterId"
              value={dialogue.characterId}
              onChange={handleChange}
            >
              <option value="" disabled>Pilih Karakter</option>
              {characters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
            <TextArea
              label="Percakapan"
              id={`conversation-${dialogue.id}`}
              name="conversation"
              value={dialogue.conversation}
              onChange={handleChange}
              placeholder="Tuliskan dialog di sini..."
              rows={2}
            />
        </div>
        <Button variant="danger" onClick={() => onDelete(dialogue.id)} className="mt-7 !p-2">
            <TrashIcon />
        </Button>
      </div>
    </Card>
  );
};
