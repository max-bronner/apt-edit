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

export const parseCharacter: CustomCallback = (view, offset) => {
  const type = view.getUint32(offset, true);
  const byteSize = 0; // required parameter
  switch (type) {
    case CharacterType.SHAPE:
      return { result: Struct.shapeStruct.parse(view, offset), byteSize };
    case CharacterType.EDITTEXT:
      return { result: Struct.editTextStruct.parse(view, offset), byteSize };
    case CharacterType.FONT:
      return { result: Struct.fontStruct.parse(view, offset), byteSize };
    case CharacterType.BUTTON:
      return { result: Struct.buttonStruct.parse(view, offset), byteSize };
    case CharacterType.SPRITE:
      return { result: Struct.spriteStruct.parse(view, offset), byteSize };
    case CharacterType.IMAGE:
      return { result: Struct.imageStruct.parse(view, offset), byteSize };
    case CharacterType.MORPH:
      return { result: Struct.morphStruct.parse(view, offset), byteSize };
    // skip movie since its the entry character
    case CharacterType.TEXT:
      return { result: Struct.textStruct.parse(view, offset), byteSize };
    default:
      return { result: view.getUint32(offset, true), byteSize };
  }
};
