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

export interface AptFile {
  fileType: string;
}

export interface OutputMovie {
  type: number;
  signature: number;
  frameCount: number;
  frames: number;
  pointer: number;
  characterCount: number;
  characters: number;
  screenSizeX: number;
  screenSizeY: number;
  unknown: number;
  importCount: number;
  imports: number;
  exportCount: number;
  exports: number;
  count: number;
}

export interface Frame {}

export interface Character {}

export interface Import {}

export interface Export {}
