import type { AptFile, OutputMovie } from './types';
import { headerStruct, outputMovieStruct } from './structs';

export const useParserApt = (buffer: ArrayBuffer) => {
  const view = new DataView(buffer);

  const parseApt = (offset: number): AptFile => {
    const fileType = headerStruct.parse(view) as unknown as string;
    const outputMovie = outputMovieStruct.parse(view, offset) as unknown as OutputMovie;

    return {
      fileType,
      outputMovie,
    };
  };

  return {
    parseApt,
  };
};
