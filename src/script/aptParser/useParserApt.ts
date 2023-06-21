import type { AptFile } from './types';
import * as Struct from './structs';

export const useParserApt = (buffer: ArrayBuffer) => {
  const view = new DataView(buffer);

  const parseApt = (offset: number): AptFile => {
    const fileType = Struct.headerStruct.parse(view) as unknown as string;
    const outputMovie = Struct.outputMovieStruct.parse(view, offset);

    return {
      fileType,
      outputMovie,
    };
  };

  return {
    parseApt,
  };
};
