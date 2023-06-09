import { createStruct } from '../struct/createStruct';

const headerStruct = createStruct();
headerStruct.addMember('fileType').string();

const frameItemStruct = createStruct();
frameItemStruct.addMember('type').uint32();

const outputFrameStruct = createStruct();
outputFrameStruct.addMember('frameItemCount').uint32();
outputFrameStruct.addMember('frameItems').pointer().array('frameItemCount').pointer().struct(frameItemStruct);

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
outputMovieStruct.addMember('frames').pointer().array('frameCount').struct(outputFrameStruct);
outputMovieStruct.addMember('pointer').uint32();
outputMovieStruct.addMember('characterCount').uint32();
outputMovieStruct.addMember('characters').pointer().array('characterCount').pointer();
outputMovieStruct.addMember('screenSizeX').uint32();
outputMovieStruct.addMember('screenSizeY').uint32();
outputMovieStruct.addMember('unknown').uint32();
outputMovieStruct.addMember('importCount').uint32();
outputMovieStruct.addMember('imports').pointer().array('importCount').struct(importStruct);
outputMovieStruct.addMember('exportCount').uint32();
outputMovieStruct.addMember('exports').pointer().array('exportCount').struct(exportStruct);
outputMovieStruct.addMember('count').uint32();

export { outputMovieStruct, headerStruct };
