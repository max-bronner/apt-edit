import { createStruct } from '../struct/createStruct';
import { ConstFile, Item, ItemType } from './types';

const constItem = createStruct();
constItem.addMember('type').uint32();

const constItemString = createStruct<Item>(constItem);
constItemString.addMember('value').pointer().string();

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
