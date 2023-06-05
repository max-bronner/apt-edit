import type { ConstFile } from './types';
import constStruct from './structs';

export const useParserConst = (buffer: ArrayBuffer) => {
  const constView = new DataView(buffer);
  const parseConst = (): ConstFile => {
    const constFile = constStruct.parse(constView);

    return {
      fileType: constFile.fileType as unknown as string,
      aptOffset: constFile.aptOffset as unknown as number,
      items: constFile.items,
    };
  };

  return {
    parseConst,
  };
};
