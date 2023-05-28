import type { AptFile, OutputMovie } from './parserType';
import { useParser } from './useParser';
import { OutputMovieStruct } from './structs';

export const useParserApt = (buffer: ArrayBuffer) => {
  const parser = useParser(buffer);

  const parseApt = (offset: number): AptFile => {
    const fileType = parser.getString(0);
    const outputMovie = parser.parseStruct<OutputMovie>(OutputMovieStruct, offset);

    return {
      fileType,
      outputMovie,
    };
  };

  return {
    parseApt,
  };
};
