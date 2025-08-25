
import React from 'react';
import { Character } from '../types';
import { GENDER_OPTIONS, VOICE_OPTIONS, RACE_SUGGESTIONS } from '../constants';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface CharacterCardProps {
  character: Character;
  onUpdate: (character: Character) => void;
  onDelete: (id: string) => void;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onUpdate, onDelete }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onUpdate({ ...character, [e.target.name]: e.target.value });
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-grow mr-4">
            <Input
              label="Nama Karakter"
              id={`name-${character.id}`}
              name="name"
              value={character.name}
              onChange={handleChange}
              placeholder="Contoh: Budi, Sinta"
            />
        </div>
        <Button variant="danger" onClick={() => onDelete(character.id)} className="mt-7 !p-2">
            <TrashIcon/>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Ras/Etnis"
          id={`race-${character.id}`}
          name="race"
          value={character.race}
          onChange={handleChange}
          placeholder={RACE_SUGGESTIONS}
        />
        <Select
          label="Gender"
          id={`gender-${character.id}`}
          name="gender"
          value={character.gender}
          onChange={handleChange}
        >
          {GENDER_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
        </Select>
        <Input
          label="Usia"
          id={`age-${character.id}`}
          name="age"
          value={character.age}
          onChange={handleChange}
          placeholder="Contoh: 25, Remaja"
        />
        <Select
          label="Suara Karakter"
          id={`voice-${character.id}`}
          name="voice"
          value={character.voice}
          onChange={handleChange}
        >
            {VOICE_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
        </Select>
        <Input
          label="Pakaian (Outfit)"
          id={`outfit-${character.id}`}
          name="outfit"
          value={character.outfit}
          onChange={handleChange}
          placeholder="Contoh: Jaket kulit hitam, batik"
        />
        <Input
          label="Gaya Rambut"
          id={`hairstyle-${character.id}`}
          name="hairstyle"
          value={character.hairstyle}
          onChange={handleChange}
          placeholder="Contoh: Cepak, dikuncir"
        />
      </div>
       <TextArea
          label="Deskripsi & Aksi"
          id={`description-${character.id}`}
          name="description"
          value={character.description}
          onChange={handleChange}
          placeholder="Deskripsi fisik atau kepribadian karakter"
        />
        <TextArea
          label="Aksi"
          id={`action-${character.id}`}
          name="action"
          value={character.action}
          onChange={handleChange}
          placeholder="Aksi yang dilakukan karakter. Cth: sedang berjalan, membaca buku"
        />
    </Card>
  );
};
