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

export interface OutputMovie {
  type: number;
  signature: number;
  frameCount: number;
  frames: number;
  pointer: number;
  characterCount: number;
  characters: number;
  screenSizeX: number;
  screenSizeY: number;
  unknown: number;
  importCount: number;
  imports: number;
  exportCount: number;
  exports: number;
  count: number;
}

export interface Import {
  movie: string | number;
  name: string | number;
  character: number;
  pointer: number;
}
