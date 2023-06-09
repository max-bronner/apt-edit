import { createStruct } from '../createStruct';
import type { CustomCallback } from '../types';
import { getString } from '../../utilities/utilities';

const parseConstItemType: CustomCallback = (view, offset, data) => {
  const dataValue = view.getUint32(offset, true);
  return data.type === 1 ? getString(view, dataValue) : dataValue;
};

const constItems = createStruct();
constItems.addMember('type').uint32();
constItems.addMember('value').custom(parseConstItemType, 4);

const constStruct = createStruct();
constStruct.addMember('fileType').string();
constStruct.addMember('aptOffset').uint32();
constStruct.addMember('itemCount').uint32();
constStruct.addMember('unknown').uint32();
constStruct.addMember('items').array('itemCount').struct(constItems);

const headerStruct = createStruct();
headerStruct.addMember('fileType').string();

const characterStruct = createStruct();
characterStruct.addMember('type').uint32();
characterStruct.addMember('signature').uint32();

const vector2Struct = createStruct();
vector2Struct.addMember('X').uint32();
vector2Struct.addMember('Y').uint32();

const transformStruct = createStruct();
transformStruct.addMember('m00').uint32();
transformStruct.addMember('m01').uint32();
transformStruct.addMember('m10').uint32();
transformStruct.addMember('m11').uint32();

const frameItemStruct = createStruct();
frameItemStruct.addMember('type').uint32();

const outputActionStruct = createStruct(frameItemStruct);
outputActionStruct.addMember('actionBytes').pointer();

const frameLabelStruct = createStruct(frameItemStruct);
frameLabelStruct.addMember('label').pointer().string();
frameLabelStruct.addMember('flags').uint32();
frameLabelStruct.addMember('frame').uint32();

const placeObjectStruct = createStruct(frameItemStruct);
placeObjectStruct.addMember('flags').uint32();
placeObjectStruct.addMember('depth').uint32();
placeObjectStruct.addMember('character').uint32();
placeObjectStruct.addMember('rotateAndScale').struct(transformStruct);
placeObjectStruct.addMember('translate').struct(vector2Struct);
placeObjectStruct.addMember('colorTransform').uint32();
placeObjectStruct.addMember('unknown').uint32();
placeObjectStruct.addMember('ratio').uint32();
placeObjectStruct.addMember('name').pointer().string();
placeObjectStruct.addMember('clipdepth').uint32();
placeObjectStruct.addMember('placeObjectActions').pointer();

const removeObjectStruct = createStruct(frameItemStruct);
removeObjectStruct.addMember('depth').uint32();

const backgroundColorStruct = createStruct(frameItemStruct);
backgroundColorStruct.addMember('color').uint32();

const initActionStruct = createStruct(frameItemStruct);
initActionStruct.addMember('sprite').uint32();
initActionStruct.addMember('actionBytes').uint32();

const outputFrameStruct = createStruct();
outputFrameStruct.addMember('frameItemCount').uint32();
outputFrameStruct.addMember('frameItems').pointer().array('frameItemCount').pointer();

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
outputMovieStruct.addMember('frames').pointer().array('frameCount').struct(outputFrameStruct);
outputMovieStruct.addMember('pointer').uint32();
outputMovieStruct.addMember('characterCount').uint32();
outputMovieStruct.addMember('characters').pointer().array('characterCount').pointer().uint32();
outputMovieStruct.addMember('screenSizeX').uint32();
outputMovieStruct.addMember('screenSizeY').uint32();
outputMovieStruct.addMember('unknown').uint32();
outputMovieStruct.addMember('importCount').uint32();
outputMovieStruct.addMember('imports').pointer().array('importCount').struct(importStruct);
outputMovieStruct.addMember('exportCount').uint32();
outputMovieStruct.addMember('exports').pointer().array('exportCount').struct(exportStruct);
outputMovieStruct.addMember('count').uint32();

enum FrameItemType {
  Action = 1,
  FrameLabel = 2,
  PlaceObject = 3,
  RemoveObject = 4,
  BackgroundColor = 5,
  InitAction = 8,
}

export const playground = async () => {
  const viewConst = new DataView(
    await fetch('script/struct/playground/example.const').then((resp) => resp.arrayBuffer()),
  );
  const viewApt = new DataView(await fetch('script/struct/playground/example.apt').then((resp) => resp.arrayBuffer()));

  const dataConst = constStruct.parse(viewConst);
  const dataApt = outputMovieStruct.parse(viewApt, dataConst.aptOffset as unknown as number);

  const dataOutputFrames = dataApt.frames.map((frames) =>
    frames.frameItems?.map((frameItem: number) => {
      const type = viewApt.getUint32(frameItem, true);
      switch (type) {
        case FrameItemType.Action:
          return outputActionStruct.parse(viewApt, frameItem);
        case FrameItemType.FrameLabel:
          return frameLabelStruct.parse(viewApt, frameItem);
        case FrameItemType.PlaceObject:
          return placeObjectStruct.parse(viewApt, frameItem);
        case FrameItemType.RemoveObject:
          return removeObjectStruct.parse(viewApt, frameItem);
        case FrameItemType.BackgroundColor:
          return backgroundColorStruct.parse(viewApt, frameItem);
        case FrameItemType.InitAction:
          return initActionStruct.parse(viewApt, frameItem);
      }
    }),
  );

  console.log(dataApt);
};
