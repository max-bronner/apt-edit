export interface ConstFile {
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

export const enum ConstItemType {
  TypeUndefined = 0,
  TypeString = 1,
  TypeNumber = 4,
}