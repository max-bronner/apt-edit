import type { AptFile, OutputMovie } from './parser';
import { parseString } from './utilities';

const parseOutputMovie = (buffer: ArrayBuffer, index: number): OutputMovie => {
  const iterator = new Uint32Array(buffer, index, 15).values();
  const outputMovie: any = {};
  outputMovie.type = iterator.next();
  outputMovie.signature = iterator.next();
  outputMovie.frameCount = iterator.next();
  outputMovie.frames = iterator.next();
  outputMovie.pointer = iterator.next();
  outputMovie.characterCount = iterator.next();
  outputMovie.characters = iterator.next();
  outputMovie.screenSizeX = iterator.next();
  outputMovie.screenSizeY = iterator.next();
  outputMovie.unknown = iterator.next();
  outputMovie.importCount = iterator.next();
  outputMovie.imports = iterator.next();
  outputMovie.exportCount = iterator.next();
  outputMovie.exports = iterator.next();
  outputMovie.count = iterator.next();

  return outputMovie as OutputMovie;
};

export const parseApt = (buffer: ArrayBuffer, index: number): AptFile => {
  const fileType = parseString(buffer);
  const outputMovie = parseOutputMovie(buffer, index);
  console.log(outputMovie);

  return {
    fileType,
  };
};
