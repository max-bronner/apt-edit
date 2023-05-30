import type { AptFile, Import, OutputMovie } from './types';
import { useParser } from '../parser/useParser';
import { OutputMovieStruct, ImportStruct } from './structs';

export const useParserApt = (buffer: ArrayBuffer) => {
  const parser = useParser(buffer);

  const parseApt = (offset: number): AptFile => {
    const fileType = parser.getString(0);
    const outputMovie = parser.parseStruct<OutputMovie>(OutputMovieStruct, offset);
    parser.updateOffset(outputMovie.imports);
    const imports: Import[] = [];
    for (let i = 0; i < outputMovie.importCount; i++) {
      const imp = parser.parseStruct<Import>(ImportStruct);
      const movie = parser.getString(imp.movie as number);
      const name = parser.getString(imp.name as number);
      imports.push({
        ...imp,
        movie,
        name,
      });
    }

    return {
      fileType,
      outputMovie,
    };
  };

  return {
    parseApt,
  };
};
