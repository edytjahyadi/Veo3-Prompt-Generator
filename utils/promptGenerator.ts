
import { Character, Dialogue, Scene, GeneratedPrompts } from '../types';

interface PromptData {
  characters: Character[];
  dialogues: Dialogue[];
  scene: Scene;
}

const getCharacterName = (id: string, characters: Character[]): string => {
  return characters.find(c => c.id === id)?.name || 'Karakter Tidak Dikenal';
};

export const generatePrompts = ({ characters, dialogues, scene }: PromptData): GeneratedPrompts => {
  const sceneData = { scene, characters, dialogues };

  // JSON Prompt
  const json = JSON.stringify(sceneData, null, 2);

  // Indonesian Prompt
  let indonesian = `Sebuah video ${scene.artStyle} dengan rasio aspek ${scene.aspectRatio}.
LOKASI: ${scene.environment || 'Tidak ditentukan'}.
PENCAHAYAAN: ${scene.lighting}.
PENGAMBILAN GAMBAR: Sudut kamera ${scene.cameraAngle} dengan gaya ${scene.shootingStyle}.\n\n`;

  if (characters.length > 0) {
    indonesian += "KARAKTER:\n";
    characters.forEach((c, index) => {
      indonesian += `${index + 1}. ${c.name}: seorang ${c.race} ${c.gender} berusia sekitar ${c.age} tahun. Pakaian: ${c.outfit}. Gaya rambut: ${c.hairstyle}. Suara: ${c.voice}. Deskripsi: ${c.description}. Aksi: ${c.action}.\n`;
    });
    indonesian += "\n";
  }

  if (dialogues.length > 0) {
    indonesian += "DIALOG:\n";
    dialogues.forEach(d => {
      indonesian += `${getCharacterName(d.characterId, characters)}: "${d.conversation}"\n`;
    });
  }

  // English Prompt
  let english = `A ${scene.artStyle} video with an aspect ratio of ${scene.aspectRatio}.
LOCATION: ${scene.environment || 'Not specified'}.
LIGHTING: ${scene.lighting}.
SHOT: A ${scene.cameraAngle} camera angle with a ${scene.shootingStyle} style.\n\n`;

  if (characters.length > 0) {
    english += "CHARACTERS:\n";
    characters.forEach((c, index) => {
      english += `${index + 1}. ${c.name}: a ${c.race} ${c.gender} around ${c.age} years old. Outfit: ${c.outfit}. Hairstyle: ${c.hairstyle}. Voice: ${c.voice}. Description: ${c.description}. Action: ${c.action}.\n`;
    });
    english += "\n";
  }

  if (dialogues.length > 0) {
    english += "DIALOGUE:\n";
    dialogues.forEach(d => {
      english += `${getCharacterName(d.characterId, characters)}: "${d.conversation}"\n`;
    });
  }

  return { indonesian, english, json };
};
