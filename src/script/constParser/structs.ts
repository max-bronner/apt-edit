import { createStruct } from '../struct/createStruct';
import { getString } from '../utilities/utilities';
import { CustomCallback } from '../struct/types';
import { ConstFile, Item } from './types';

const parseType: CustomCallback = (view, offset, data) => {
  const byteSize = 4;
  const result = data.type === 1 ? getString(view, offset) : offset;
  return {
    byteSize,
    result,
  };
};

const constItems = createStruct<Item>();
constItems.addMember('type').uint32();
constItems.addMember('value').pointer().custom(parseType);

const constStruct = createStruct<ConstFile>();
constStruct.addMember('fileType').string();
constStruct.addMember('aptOffset').uint32();
constStruct.addMember('itemCount').uint32();
constStruct.addMember('unknown').uint32();
constStruct.addMember('items').array('itemCount').struct(constItems);

export default constStruct;
