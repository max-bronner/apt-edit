import { Parser } from './parser';

const isFalsy = (element: any): boolean => !element;

export const parseString: Parser<string> = (buffer: ArrayBuffer, index: number = 0) => {
  const decoder = new TextDecoder();
  const charArray = new Uint8Array(buffer, index);
  const length = charArray.findIndex(isFalsy);
  const stringArray = charArray.subarray(0, length);
  return decoder.decode(stringArray);
}