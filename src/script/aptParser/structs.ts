import { createStruct } from '../struct/createStruct';
import { parseActions } from './actionScript/parseAction';
import type { Export, Import, OutputMovie } from './types';
import { parseFrameItem, parseCharacter } from './customParser';
const debug = { debug: true };

const headerStruct = createStruct();
headerStruct.addMember('fileType').string();

const characterStruct = createStruct();
characterStruct.addMember('type').uint32();
characterStruct.addMember('signature').uint32();

const vector2Struct = createStruct();
vector2Struct.addMember('X').float32();
vector2Struct.addMember('Y').float32();

const triangleStruct = createStruct();
triangleStruct.addMember('v1').uint16();
triangleStruct.addMember('v2').uint16();
triangleStruct.addMember('v3').uint16();

const colorStruct = createStruct();
colorStruct.addMember('red').uint8();
colorStruct.addMember('green').uint8();
colorStruct.addMember('blue').uint8();
colorStruct.addMember('alpha').uint8();

const rectStruct = createStruct();
rectStruct.addMember('left').float32();
rectStruct.addMember('top').float32();
rectStruct.addMember('right').float32();
rectStruct.addMember('bottom').float32();

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
outputFrameStruct.addMember('frameItems').pointer().array('frameItemCount').pointer().custom(parseFrameItem);

const importStruct = createStruct<Import>();
importStruct.addMember('movie').pointer().string();
importStruct.addMember('name').pointer().string();
importStruct.addMember('character').uint32();
importStruct.addMember('pointer').uint32();

const exportStruct = createStruct<Export>();
exportStruct.addMember('name').pointer().string();
exportStruct.addMember('character').uint32();

export const shapeStruct = createStruct(characterStruct);
shapeStruct.addMember('bounds').struct(rectStruct);
shapeStruct.addMember('geometry').uint32();

export const editTextStruct = createStruct(characterStruct);
editTextStruct.addMember('bounds').struct(rectStruct);
editTextStruct.addMember('font').uint32();
editTextStruct.addMember('alignment').uint32();
editTextStruct.addMember('color').struct(colorStruct);
editTextStruct.addMember('fontheight').float32();
editTextStruct.addMember('readonly').uint32();
editTextStruct.addMember('multiline').uint32();
editTextStruct.addMember('wordwrap').uint32();
editTextStruct.addMember('text').pointer().string();
editTextStruct.addMember('variable').pointer().string();

export const fontStruct = createStruct(characterStruct);
fontStruct.addMember('name').pointer().string();
fontStruct.addMember('glyphcount').uint32();
fontStruct.addMember('glyphs').pointer().array('glyphcount').uint32();

const buttonActionFlagStruct = createStruct();
buttonActionFlagStruct.addMember('flags').uint32();
buttonActionFlagStruct.addMember('actiondata').pointer().custom(parseActions);

const buttonActionStruct = createStruct();
buttonActionStruct.addMember('flags').uint32();
buttonActionStruct.addMember('actiondata').pointer().custom(parseActions);

const buttonRecordStruct = createStruct();
buttonRecordStruct.addMember('flags').uint32();
buttonRecordStruct.addMember('character').uint32();
buttonRecordStruct.addMember('depth').int32();
buttonRecordStruct.addMember('rotateandscale').struct(transformStruct);
buttonRecordStruct.addMember('translate').struct(vector2Struct);
buttonRecordStruct.addMember('color').struct(rectStruct);
buttonRecordStruct.addMember('unknown').struct(rectStruct);

export const buttonStruct = createStruct(characterStruct);
buttonStruct.addMember('unknown').uint32();
buttonStruct.addMember('bounds').struct(rectStruct);
buttonStruct.addMember('trianglecount').uint32();
buttonStruct.addMember('vertexcount').uint32();
buttonStruct.addMember('vertexes').pointer().array('vertexcount').struct(vector2Struct);
buttonStruct.addMember('triangles').pointer().array('trianglecount').struct(triangleStruct);
buttonStruct.addMember('recordcount').uint32();
buttonStruct.addMember('buttonrecords').pointer().array('recordcount').struct(buttonRecordStruct);
buttonStruct.addMember('buttonactioncount').uint32();
buttonStruct.addMember('buttonactionrecords').pointer().array('buttonactioncount').struct(buttonActionStruct);
buttonStruct.addMember('unknown2').uint32();

export const spriteStruct = createStruct(characterStruct);
spriteStruct.addMember('frameCount').uint32();
spriteStruct.addMember('frames').pointer().array('frameCount').struct(outputFrameStruct);
spriteStruct.addMember('pointer').uint32();

export const imageStruct = createStruct(characterStruct);
imageStruct.addMember('texture').uint32();

export const morphStruct = createStruct(characterStruct);
morphStruct.addMember('startshape').uint32();
morphStruct.addMember('endshape').uint32();

const glyphStruct = createStruct(characterStruct);
glyphStruct.addMember('index').uint32();
glyphStruct.addMember('advance').int32();

const outputTextRecordStruct = createStruct(characterStruct);
outputTextRecordStruct.addMember('font').uint32();
outputTextRecordStruct.addMember('color').struct(colorStruct);
outputTextRecordStruct.addMember('unknown').struct(rectStruct);
outputTextRecordStruct.addMember('offset').struct(vector2Struct);
outputTextRecordStruct.addMember('textheight').float32();
outputTextRecordStruct.addMember('glyphcount').uint32();
outputTextRecordStruct.addMember('glyphs').pointer().array('glyphcount').struct(glyphStruct);

export const textStruct = createStruct(characterStruct);
textStruct.addMember('bounds').struct(rectStruct);
textStruct.addMember('rotateandscale').struct(transformStruct);
textStruct.addMember('translate').struct(vector2Struct);
textStruct.addMember('recordcount').uint32();
textStruct.addMember('records').pointer().array('recordcount').struct(outputTextRecordStruct);

const outputMovieStruct = createStruct<OutputMovie>(characterStruct);
outputMovieStruct.addMember('frameCount').uint32();
outputMovieStruct.addMember('frames').pointer().array('frameCount').struct(outputFrameStruct);
outputMovieStruct.addMember('pointer').uint32();
outputMovieStruct.addMember('characterCount').uint32();
outputMovieStruct.addMember('characters').pointer().array('characterCount').pointer().custom(parseCharacter);
outputMovieStruct.addMember('screenSizeX').uint32();
outputMovieStruct.addMember('screenSizeY').uint32();
outputMovieStruct.addMember('unknown').uint32();
outputMovieStruct.addMember('importCount').uint32();
outputMovieStruct.addMember('imports').pointer().array('importCount').struct(importStruct);
outputMovieStruct.addMember('exportCount').uint32();
outputMovieStruct.addMember('exports').pointer().array('exportCount').struct(exportStruct);
outputMovieStruct.addMember('count').uint32();

export { outputMovieStruct, headerStruct };
