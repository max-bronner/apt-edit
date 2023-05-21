const decoder = new TextDecoder();

export const isFalsy = (element: any): boolean => !element;

export const parseString = (buffer: ArrayBuffer, index: number = 0): string => {
  const charArray = new Uint8Array(buffer, index);
  const length = charArray.findIndex(isFalsy);
  const stringArray = charArray.subarray(0, length);
  return decoder.decode(stringArray);
}