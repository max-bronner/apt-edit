export enum CharacterType {
  SHAPE = 1,
  EDITTEXT = 2,
  FONT = 3,
  BUTTON = 4,
  SPRITE = 5,
  IMAGE = 7,
  MORPH = 8,
  MOVIE = 9,
  TEXT = 10,
}

export enum FrameItemType {
  ACTION = 1,
  FRAMELABEL = 2,
  PLACEOBJECT = 3,
  REMOVEOBJECT = 4,
  BACKGROUNDCOLOR = 5,
  INITACTION = 8,
}

export interface AptFile {
  fileType: string;
  outputMovie: OutputMovie;
}

export interface Character {
  type: number;
  signature: number;
}

export interface OutputFrame {
  frameItemCount: number;
  frameItems: any[];
}

export interface Import {
  movie: string;
  name: string;
  character: number;
  pointer: number;
}

export interface Export {
  name: string;
  character: number;
}

export interface OutputMovie extends Character {
  frameCount: number;
  frames: OutputFrame[];
  pointer: number;
  characterCount: number;
  characters: number[];
  screenSizeX: number;
  screenSizeY: number;
  unknown: number;
  importCount: number;
  imports: Import[];
  exportCount: number;
  exports: Export[];
  count: number;
}
