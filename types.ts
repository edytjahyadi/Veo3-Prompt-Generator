
export interface Character {
  id: string;
  name: string;
  race: string;
  gender: string;
  age: string;
  outfit: string;
  hairstyle: string;
  voice: string;
  description: string;
  action: string;
}

export interface Dialogue {
  id: string;
  characterId: string;
  conversation: string;
}

export interface Scene {
  environment: string;
  lighting: string;
  cameraAngle: string;
  shootingStyle: string;
  artStyle: string;
  aspectRatio: string;
}

export type GeneratedPrompts = {
  indonesian: string;
  english: string;
  json: string;
};
