import { DataType } from '../parser/types';

// camelCase for struct enums to emphasize they are used as structs
export enum ConstHeadStruct {
  fileType = DataType.String,
  aptOffset = DataType.Uint32,
  itemCount = DataType.Uint32,
  unknown = DataType.Uint32,
}

export enum ConstItemStruct {
  itemType = DataType.Uint32,
  itemValue = DataType.Uint32,
}
