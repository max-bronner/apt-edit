import type { ConstFile } from './types';
import constStruct from './structs';

export const useParserConst = (buffer: ArrayBuffer) => {
  const constView = new DataView(buffer);
  const parseConst = (): ConstFile => constStruct.parse(constView);

  return {
    parseConst,
  };
};
