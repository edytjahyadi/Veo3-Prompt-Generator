
import React, { useState, useEffect, useCallback } from 'react';
import { Character, Dialogue, Scene, GeneratedPrompts } from './types';
import { CharacterCard } from './components/CharacterCard';
import { DialogueEntry } from './components/DialogueEntry';
import { EnvironmentSection } from './components/EnvironmentSection';
import { OutputSection } from './components/OutputSection';
import { SectionHeader } from './components/SectionHeader';
import { Button } from './components/ui/Button';
import { generatePrompts } from './utils/promptGenerator';
import {
  GENDER_OPTIONS,
  VOICE_OPTIONS,
  LIGHTING_OPTIONS,
  CAMERA_ANGLE_OPTIONS,
  SHOOTING_STYLE_OPTIONS,
  ART_STYLE_OPTIONS,
  ASPECT_RATIO_OPTIONS
} from './constants';

const initialCharacter: Omit<Character, 'id'> = {
  name: 'Alex',
  race: 'Indonesia',
  gender: GENDER_OPTIONS[0],
  age: '30',
  outfit: 'Kemeja flanel merah dan celana jeans',
  hairstyle: 'Rambut pendek ikal',
  voice: VOICE_OPTIONS[1],
  description: 'Seorang petualang yang ramah dengan tatapan mata yang tajam.',
  action: 'Duduk di cafe sambil melihat keluar jendela.'
};

const initialScene: Scene = {
  environment: 'Sebuah kafe yang nyaman di pinggir kota saat senja',
  lighting: LIGHTING_OPTIONS[1],
  cameraAngle: CAMERA_ANGLE_OPTIONS[0],
  shootingStyle: SHOOTING_STYLE_OPTIONS[4],
  artStyle: ART_STYLE_OPTIONS[0],
  aspectRatio: ASPECT_RATIO_OPTIONS[0]
};

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([{...initialCharacter, id: crypto.randomUUID()}]);
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [scene, setScene] = useState<Scene>(initialScene);
  const [prompts, setPrompts] = useState<GeneratedPrompts>({ indonesian: '', english: '', json: '' });
  
  const regeneratePrompts = useCallback(() => {
    const newPrompts = generatePrompts({ characters, dialogues, scene });
    setPrompts(newPrompts);
  }, [characters, dialogues, scene]);

  useEffect(() => {
    regeneratePrompts();
  }, [regeneratePrompts]);


  // Character Handlers
  const addCharacter = () => {
    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: `Karakter ${characters.length + 1}`,
      race: '', gender: GENDER_OPTIONS[0], age: '', outfit: '', hairstyle: '', voice: VOICE_OPTIONS[0], description: '', action: ''
    };
    setCharacters(prev => [...prev, newCharacter]);
  };

  const updateCharacter = (updatedCharacter: Character) => {
    setCharacters(prev => prev.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
  };

  const deleteCharacter = (id: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id));
    setDialogues(prev => prev.filter(d => d.characterId !== id));
  };

  // Dialogue Handlers
  const addDialogue = () => {
    const newDialogue: Dialogue = {
      id: crypto.randomUUID(),
      characterId: characters.length > 0 ? characters[0].id : '',
      conversation: ''
    };
    setDialogues(prev => [...prev, newDialogue]);
  };

  const updateDialogue = (updatedDialogue: Dialogue) => {
    setDialogues(prev => prev.map(d => d.id === updatedDialogue.id ? updatedDialogue : d));
  };

  const deleteDialogue = (id: string) => {
    setDialogues(prev => prev.filter(d => d.id !== id));
  };
  
  const updateScene = (updatedScene: Scene) => {
      setScene(updatedScene);
  }

  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              VEO3 Prompt Generator
            </span>
          </h1>
          <p className="mt-2 text-lg text-slate-400">Buat prompt video kompleks dengan mudah.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Column */}
          <div className="space-y-8">
            <section>
              <SectionHeader
                title="Karakter"
                action={<Button onClick={addCharacter}><PlusIcon /> Tambah Karakter</Button>}
              />
              <div className="space-y-4">
                {characters.map(char => (
                  <CharacterCard key={char.id} character={char} onUpdate={updateCharacter} onDelete={deleteCharacter} />
                ))}
              </div>
            </section>
            
            <section>
               <SectionHeader
                title="Dialog"
                action={<Button onClick={addDialogue} disabled={characters.length === 0}><PlusIcon /> Tambah Dialog</Button>}
              />
               <div className="space-y-4">
                {dialogues.map(diag => (
                  <DialogueEntry key={diag.id} dialogue={diag} characters={characters} onUpdate={updateDialogue} onDelete={deleteDialogue} />
                ))}
              </div>
            </section>

            <section>
              <EnvironmentSection scene={scene} onUpdate={updateScene} />
            </section>
          </div>
          
          {/* Output Column */}
          <div className="lg:sticky top-8 self-start">
            <OutputSection prompts={prompts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
