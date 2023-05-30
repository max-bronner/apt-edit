import { DataType } from '../parser/types';

export enum OutputMovieStruct {
  type = DataType.Uint32,
  signature = DataType.Uint32,
  frameCount = DataType.Uint32,
  frames = DataType.Uint32,
  pointer = DataType.Uint32,
  characterCount = DataType.Uint32,
  characters = DataType.Uint32,
  screenSizeX = DataType.Uint32,
  screenSizeY = DataType.Uint32,
  unknown = DataType.Uint32,
  importCount = DataType.Uint32,
  imports = DataType.Uint32,
  exportCount = DataType.Uint32,
  exports = DataType.Uint32,
  count = DataType.Uint32,
}

export enum OutputFrameStruct {
  frameItemCount = DataType.Uint32,
  frameItem = DataType.Uint32,
}

export enum FrameItemStruct {
  type = DataType.Uint32,
}

export enum CharacterStruct {
  type = DataType.Uint32,
  signature = DataType.Uint32,
}

export enum ImportStruct {
  movie = DataType.Uint32,
  name = DataType.Uint32,
  character = DataType.Uint32,
  pointer = DataType.Uint32,
}

export enum ExportStruct {
  name = DataType.Uint32,
  character = DataType.Uint32,
}
