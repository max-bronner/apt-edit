import { createStruct } from '../struct/createStruct';
import { getString } from '../utilities/utilities';
import { CustomCallback } from '../struct/types';

const parseType: CustomCallback = (view, offset, data) => {
  const dataValue = view.getUint32(offset, true);
  return data.type === 1 ? getString(view, dataValue) : dataValue;
};

const constItems = createStruct();
constItems.addMember('type').uint32();
constItems.addMember('value').custom(parseType, 4);

const constStruct = createStruct();
constStruct.addMember('fileType').string();
constStruct.addMember('aptOffset').uint32();
constStruct.addMember('itemCount').uint32();
constStruct.addMember('unknown').uint32();
constStruct.addMember('items').array('itemCount').struct(constItems);

export default constStruct;
