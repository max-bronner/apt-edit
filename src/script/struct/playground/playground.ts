import { createStruct } from '../createStruct';
import type { CustomCallback } from '../types';
import { getString } from '../../utilities/utilities';

const parseConstItemType: CustomCallback = (view, offset, data) => {
  const dataValue = view.getUint32(offset, true);
  return data.type === 1 ? getString(view, dataValue) : dataValue;
};

const parseCharacterType: CustomCallback = (view, offset, data) => {
  if (offset === 0) return 0;
  return view.getUint32(offset, true);
};

const constItems = createStruct();
constItems.addMember('type').uint32();
constItems.addMember('value').custom(parseConstItemType, 4);

const constStruct = createStruct();
constStruct.addMember('fileType').string();
constStruct.addMember('aptOffset').uint32();
constStruct.addMember('itemCount').uint32();
constStruct.addMember('unknown').uint32();
constStruct.addMember('items').arrayAlt('itemCount').struct(constItems);

const headerStruct = createStruct();
headerStruct.addMember('fileType').string();

const characterStruct = createStruct();
characterStruct.addMember('type').pointer().custom(parseCharacterType, 4);

const frameItemStruct = createStruct();
frameItemStruct.addMember('type').uint32();

const outputFrameStruct = createStruct();
outputFrameStruct.addMember('frameItemCount').uint32();
outputFrameStruct.addMember('frameItems').pointer().arrayAlt('frameItemCount').pointer();

const importStruct = createStruct();
importStruct.addMember('movie').pointer().string();
importStruct.addMember('name').pointer().string();
importStruct.addMember('character').uint32();
importStruct.addMember('pointer').uint32();

const exportStruct = createStruct();
exportStruct.addMember('name').pointer().string();
exportStruct.addMember('character').uint32();

const outputMovieStruct = createStruct(characterStruct);
outputMovieStruct.addMember('frameCount').uint32();
outputMovieStruct.addMember('frames').pointer().arrayAlt('frameCount').struct(outputFrameStruct);
outputMovieStruct.addMember('pointer').uint32();
outputMovieStruct.addMember('characterCount').uint32();
outputMovieStruct.addMember('characters').pointer().arrayAlt('characterCount').pointer().custom(parseCharacterType, 4);
outputMovieStruct.addMember('screenSizeX').uint32();
outputMovieStruct.addMember('screenSizeY').uint32();
outputMovieStruct.addMember('unknown').uint32();
outputMovieStruct.addMember('importCount').uint32();
outputMovieStruct.addMember('imports').pointer().arrayAlt('importCount').struct(importStruct);
outputMovieStruct.addMember('exportCount').uint32();
outputMovieStruct.addMember('exports').pointer().arrayAlt('exportCount').struct(exportStruct);
outputMovieStruct.addMember('count').uint32();

export const playground = async () => {
  const viewConst = new DataView(
    await fetch('script/struct/playground/example.const').then((resp) => resp.arrayBuffer()),
  );
  const viewApt = new DataView(await fetch('script/struct/playground/example.apt').then((resp) => resp.arrayBuffer()));

  const dataConst = constStruct.parse(viewConst);
  const dataApt = outputMovieStruct.parse(viewApt, dataConst.aptOffset as unknown as number);

  console.log(dataApt);
};
