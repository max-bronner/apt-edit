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

const headerStruct = createStruct();
headerStruct.addMember('fileType').string();

const importStruct = createStruct();
importStruct.addMember('movie').pointer().string();
importStruct.addMember('name').pointer().string();
importStruct.addMember('character').uint32();
importStruct.addMember('pointer').uint32();

const exportStruct = createStruct();
exportStruct.addMember('name').pointer().string();
exportStruct.addMember('character').uint32();

const outputMovieStruct = createStruct();
outputMovieStruct.addMember('type').uint32();
outputMovieStruct.addMember('signature').uint32();
outputMovieStruct.addMember('frameCount').uint32();
outputMovieStruct.addMember('frames').uint32();
outputMovieStruct.addMember('pointer').uint32();
outputMovieStruct.addMember('characterCount').uint32();
outputMovieStruct.addMember('characters').pointer();
outputMovieStruct.addMember('screenSizeX').uint32();
outputMovieStruct.addMember('screenSizeY').uint32();
outputMovieStruct.addMember('unknown').uint32();
outputMovieStruct.addMember('importCount').uint32();
outputMovieStruct.addMember('imports').pointer().array(importStruct, 'importCount');
outputMovieStruct.addMember('exportCount').uint32();
outputMovieStruct.addMember('exports').pointer().array(exportStruct, 'exportCount');
outputMovieStruct.addMember('count').uint32();

export const playground = async () => {
  const viewConst = new DataView(
    await fetch('script/struct/playground/example.const').then((resp) => resp.arrayBuffer()),
  );
  const viewApt = new DataView(await fetch('script/struct/playground/example.apt').then((resp) => resp.arrayBuffer()));

  const dataConst = constStruct.parse(viewConst);
  const dataApt = outputMovieStruct.parse(viewApt, dataConst.aptOffset as unknown as number);
};
