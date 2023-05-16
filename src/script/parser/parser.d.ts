export type Parser<T> = (buffer: ArrayBuffer, index?: number) => T;

export interface Const {
  fileType: string;
  aptOffset: number;
  items: ConstItem[];
}

export interface ConstHead {
  fileType: string;
  aptOffset: number;
  itemCount: number;
}

export interface ConstItem {
  itemType: number;
  itemValue: number | string;
}
