export enum ItemType {
  TypeUndefined = 0,
  TypeString = 1,
  TypeNumber = 4,
}

export interface Item {
  type: number;
  value: number | string;
}
export interface ConstFile {
  fileType: string;
  aptOffset: number;
  itemCount: number;
  unknown: number;
  items: Item[];
}
