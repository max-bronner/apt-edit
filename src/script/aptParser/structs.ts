import { createStruct } from '../struct/createStruct';
import { parseActions } from './actionScript/parseAction';
import type { Export, Import, OutputMovie } from './types';

const headerStruct = createStruct();
headerStruct.addMember('fileType').string();

const characterStruct = createStruct();
characterStruct.addMember('type').uint32();
characterStruct.addMember('signature').uint32();

const vector2Struct = createStruct();
vector2Struct.addMember('X').float32();
vector2Struct.addMember('Y').float32();

const colorStruct = createStruct();
colorStruct.addMember('red').uint8();
colorStruct.addMember('green').uint8();
colorStruct.addMember('blue').uint8();
colorStruct.addMember('alpha').uint8();

const transformStruct = createStruct();
transformStruct.addMember('m00').float32();
transformStruct.addMember('m01').float32();
transformStruct.addMember('m10').float32();
transformStruct.addMember('m11').float32();

const frameItemStruct = createStruct();
frameItemStruct.addMember('type').uint32();

export const outputActionStruct = createStruct(frameItemStruct);
outputActionStruct.addMember('actionBytes').pointer().custom(parseActions);

export const frameLabelStruct = createStruct(frameItemStruct);
frameLabelStruct.addMember('label').pointer().string();
frameLabelStruct.addMember('flags').uint32();
frameLabelStruct.addMember('frame').uint32();

export const placeObjectStruct = createStruct(frameItemStruct);
placeObjectStruct.addMember('flags').uint32();
placeObjectStruct.addMember('depth').int32();
placeObjectStruct.addMember('character').int32();
placeObjectStruct.addMember('rotateAndScale').struct(transformStruct);
placeObjectStruct.addMember('translate').struct(vector2Struct);
placeObjectStruct.addMember('color').struct(colorStruct);
placeObjectStruct.addMember('unknown').uint32();
placeObjectStruct.addMember('ratio').float32();
placeObjectStruct.addMember('name').pointer().string();
placeObjectStruct.addMember('clipdepth').int32();
placeObjectStruct.addMember('placeObjectActions').pointer();

export const removeObjectStruct = createStruct(frameItemStruct);
removeObjectStruct.addMember('depth').uint32();

export const backgroundColorStruct = createStruct(frameItemStruct);
backgroundColorStruct.addMember('color').struct(colorStruct);

export const initActionStruct = createStruct(frameItemStruct);
initActionStruct.addMember('sprite').uint32();
initActionStruct.addMember('actionBytes').uint32();

const outputFrameStruct = createStruct();
outputFrameStruct.addMember('frameItemCount').uint32();
outputFrameStruct.addMember('frameItems').pointer().array('frameItemCount').pointer();

const importStruct = createStruct<Import>();
importStruct.addMember('movie').pointer().string();
importStruct.addMember('name').pointer().string();
importStruct.addMember('character').uint32();
importStruct.addMember('pointer').uint32();

const exportStruct = createStruct<Export>();
exportStruct.addMember('name').pointer().string();
exportStruct.addMember('character').uint32();

const outputMovieStruct = createStruct<OutputMovie>(characterStruct);
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

export { outputMovieStruct, headerStruct };
