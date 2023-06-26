export const enum FileType {
  Apt = 'apt',
  Const = 'const',
}

export const getFiles = (input: FileList | null): File[] => {
  if (input?.length !== 2) {
    throw new Error(`2 files required, but ${input ? input.length : 0} selected`);
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

export const roundUp = (number: number, multiple: number): number => Math.ceil(number / multiple) * multiple;

export const getString = (view: DataView, offset: number) => {
  const decoder = new TextDecoder();
  const charArray = new Uint8Array(view.buffer, offset);
  const nullIndex = charArray.indexOf(0);
  const stringArray = charArray.subarray(0, nullIndex);
  return decoder.decode(stringArray);
};

export const getBitsOfValue = (value: number, bitLength: number) => {
  const bits = [];

  for (let i = bitLength; i >= 0; i--) {
    bits.push((value >> i) & 1);
  }

  return bits;
};

export const getValueOfBits = (bits: number[]) => {
  let result = 0;

  for (let i = 0; i < bits.length; i++) {
    result |= (bits[i] & 1) << (bits.length - i - 1);
  }

  return result;
};
