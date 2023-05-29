export enum ItemType {
  TypeUndefined = 0,
  TypeString = 1,
  TypeNumber = 4,
}

export interface ConstFile {
  fileType: string;
  aptOffset: number;
  items: ConstItem[];
}

export interface ConstHead {
  fileType: string;
  aptOffset: number;
  itemCount: number;
  unknown: number;
}

export interface ConstItem {
  itemType: ItemType;
  itemValue: number | string;
}
