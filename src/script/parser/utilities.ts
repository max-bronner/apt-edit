export const enum FileType {
  Apt = 'apt',
  Const = 'const',
}

const decoder = new TextDecoder();

export const isFalsy = (element: any): boolean => !element;

export const parseString = (buffer: ArrayBuffer, index: number = 0): string => {
  const charArray = new Uint8Array(buffer, index);
  const length = charArray.findIndex(isFalsy);
  const stringArray = charArray.subarray(0, length);
  return decoder.decode(stringArray);
};

export const getFiles = (input: FileList | null): File[] => {
  if (input?.length !== 2) {
    throw new Error(
      `2 files required, but ${input ? input.length : 0} selected`
    );
  }
  const [nameA, extensionA] = input[0].name.split('.');
  const [nameB, extensionB] = input[1].name.split('.');
  const indexApt = [extensionA, extensionB].indexOf(FileType.Apt);
  const indexConst = [extensionA, extensionB].indexOf(FileType.Const);
  if (indexApt < 0 || indexConst < 0) {
    throw new Error(`Files invalid: .const and .apt expected`);
  }
  if (nameA !== nameB) {
    throw new Error(`Files need to match each other`);
  }
  return [input[indexApt], input[indexConst]];
};

export const roundUp = (number: number, multiple: number): number =>
  Math.ceil(number / multiple) * multiple;
