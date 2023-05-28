import { DataType } from './structs';
import { roundUp } from './utilities';

type Struct = Record<string, string | number>;

export const useParser = (buffer: ArrayBuffer) => {
  let offset = 0;
  const view = new DataView(buffer);
  const decoder = new TextDecoder();

  const getString = (index: number): string => {
    const charArray = new Uint8Array(buffer, index);
    const length = charArray.findIndex((element: number): boolean => !element);
    const stringArray = charArray.subarray(0, length);
    return decoder.decode(stringArray);
  };

  const parseDataType = (dataType: DataType): string | number => {
    switch (dataType) {
      case DataType.Uint32:
        const uint32 = view.getUint32(offset, true);
        offset += 4;
        return uint32;
      case DataType.String:
        const string = getString(offset);
        offset += roundUp(string.length, 4);
        return string;
    }
  };

  const parseStructMember = <T>(parsedData: T, [member, dataType]: [keyof Struct, Struct[keyof Struct]]): T => {
    parsedData[member as keyof T] = parseDataType(dataType as DataType) as T[keyof T];
    return parsedData;
  };

  const parseStruct = <T>(struct: Struct, newOffset?: number): T => {
    offset = newOffset ?? offset;
    const members = Object.entries(struct);
    return members.reduce(parseStructMember, {} as T);
  };

  return {
    getString,
    parseStruct,
  };
};
