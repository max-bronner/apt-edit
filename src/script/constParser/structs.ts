import { createStruct } from '../struct/createStruct';
import { getString } from '../utilities/utilities';
import { CustomCallback } from '../struct/types';
import { ConstFile, Item } from './types';
import { ConstFile, Item, ItemType } from './types';

const parseType: CustomCallback = (view, offset, data) => {
  const byteSize = 4;
  const result = data.type === 1 ? getString(view, offset) : offset;
  return {
    byteSize,
    result,
  };
};

const constItemNumber = createStruct<Item>(constItem);
constItemNumber.addMember('value').uint32();

const constItemStructMap = {
  [ItemType.TypeString]: constItemString,
  [ItemType.TypeNumber]: constItemNumber,
};

const constStruct = createStruct<ConstFile>();
constStruct.addMember('fileType').string();
constStruct.addMember('aptOffset').uint32();
constStruct.addMember('itemCount').uint32();
constStruct.addMember('unknown').uint32();
constStruct.addMember('items').array('itemCount').structByType(constItemStructMap);

export default constStruct;
