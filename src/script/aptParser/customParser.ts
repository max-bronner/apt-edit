import { CustomCallback } from '../struct/types';
import { FrameItemType, CharacterType } from './types';
import * as Struct from './structs';

export const parseFrameItem: CustomCallback = (view, offset) => {
  const type = view.getUint32(offset, true);
  const byteSize = 0; // required parameter
  switch (type) {
    case FrameItemType.ACTION:
      return { result: Struct.outputActionStruct.parse(view, offset), byteSize };
    case FrameItemType.FRAMELABEL:
      return { result: Struct.frameLabelStruct.parse(view, offset), byteSize };
    case FrameItemType.PLACEOBJECT:
      return { result: Struct.placeObjectStruct.parse(view, offset), byteSize };
    case FrameItemType.REMOVEOBJECT:
      return { result: Struct.removeObjectStruct.parse(view, offset), byteSize };
    case FrameItemType.BACKGROUNDCOLOR:
      return { result: Struct.backgroundColorStruct.parse(view, offset), byteSize };
    case FrameItemType.INITACTION:
      return { result: Struct.initActionStruct.parse(view, offset), byteSize };
    default:
      throw Error('Invalid Frame Item');
  }
};
