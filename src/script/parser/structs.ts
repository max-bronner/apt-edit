export const enum DataType {
  Uint32 = 'uint32',
  String = 'string',
}

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

export enum OutputMovieStruct {
  type = DataType.Uint32,
  signature = DataType.Uint32,
  frameCount = DataType.Uint32,
  frames = DataType.Uint32,
  pointer = DataType.Uint32,
  characterCount = DataType.Uint32,
  characters = DataType.Uint32,
  screenSizeX = DataType.Uint32,
  screenSizeY = DataType.Uint32,
  unknown = DataType.Uint32,
  importCount = DataType.Uint32,
  imports = DataType.Uint32,
  exportCount = DataType.Uint32,
  exports = DataType.Uint32,
  count = DataType.Uint32,
}
