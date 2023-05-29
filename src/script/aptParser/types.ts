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
