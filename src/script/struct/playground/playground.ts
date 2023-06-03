import { createStruct } from '../createStruct';
import type { CustomCallback } from '../types';
import { getString } from '../../utilities/utilities';

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
constStruct.addMember('items').array(constItems, 'itemCount');

export const playground = async () => {
  const viewConst = new DataView(
    await fetch('script/struct/playground/example.const').then((resp) => resp.arrayBuffer()),
  );
  const viewApt = new DataView(await fetch('script/struct/playground/example.apt').then((resp) => resp.arrayBuffer()));

  const dataConst = constStruct.parse(viewConst);
};